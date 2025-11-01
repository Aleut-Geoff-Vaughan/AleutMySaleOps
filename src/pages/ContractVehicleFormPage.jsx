import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContractVehicles } from '../hooks/useContractVehicles';
import { useApp } from '../contexts/AppContext';
import { ChevronDown, ChevronUp, Save, X } from 'lucide-react';

const CollapsibleSection = ({ title, isOpen, onToggle, children, badge }) => (
  <div style={{
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '16px',
    background: 'white',
    transition: 'all 0.2s',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
  }}>
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fafafa',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderBottom: isOpen ? '1px solid #e5e7eb' : 'none'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
      onMouseLeave={(e) => e.currentTarget.style.background = '#fafafa'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
          {title}
        </h3>
        {badge && (
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            padding: '3px 10px',
            borderRadius: '12px',
            background: '#fee2e2',
            color: '#991b1b',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {badge}
          </span>
        )}
      </div>
      {isOpen ? (
        <ChevronUp style={{ width: '20px', height: '20px', color: '#6b7280' }} />
      ) : (
        <ChevronDown style={{ width: '20px', height: '20px', color: '#6b7280' }} />
      )}
    </button>
    {isOpen && (
      <div style={{ padding: '24px 20px', background: '#ffffff' }}>
        {children}
      </div>
    )}
  </div>
);

const FormField = ({ label, required, children, error }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
      {label}
      {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
    </label>
    {children}
    {error && (
      <span style={{ fontSize: '13px', color: '#ef4444' }}>{error}</span>
    )}
  </div>
);

const FormGrid = ({ children, columns = 2 }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '20px'
  }}>
    {children}
  </div>
);

export const ContractVehicleFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { contractVehicles, addContractVehicle, updateContractVehicle } = useContractVehicles();
  const { vehicleTypes, vehicleStatuses, agencies } = useApp();

  // Section collapse states
  const [sections, setSections] = useState({
    basic: true,
    details: true,
    timeline: true,
    financial: true,
    additional: false
  });

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    vehicleType: '',
    govwinId: '',
    description: '',
    agency_id: '',
    owner: '',
    status: 'Active',
    startDate: '',
    expirationDate: '',
    ceilingValue: '',
    minOrderValue: '',
    maxOrderValue: '',
    setAsideType: '',
    contacts: [],
    documents: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Load existing vehicle if editing
  useEffect(() => {
    if (isEditMode && id) {
      const vehicle = contractVehicles.find(v => v.id === parseInt(id));
      if (vehicle) {
        setFormData(vehicle);
      }
    }
  }, [isEditMode, id, contractVehicles]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Vehicle name is required';
    }
    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Vehicle type is required';
    }
    if (!formData.agency_id) {
      newErrors.agency_id = 'Agency is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert numeric fields
    const submitData = {
      ...formData,
      agency_id: parseInt(formData.agency_id) || null,
      ceilingValue: formData.ceilingValue ? parseFloat(formData.ceilingValue) : null,
      minOrderValue: formData.minOrderValue ? parseFloat(formData.minOrderValue) : null,
      maxOrderValue: formData.maxOrderValue ? parseFloat(formData.maxOrderValue) : null
    };

    if (isEditMode) {
      updateContractVehicle(parseInt(id), submitData);
    } else {
      addContractVehicle(submitData);
    }

    navigate('/contract-vehicles');
  };

  const handleCancel = () => {
    navigate('/contract-vehicles');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
          {isEditMode ? 'Edit Contract Vehicle' : 'Create New Contract Vehicle'}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          {isEditMode ? 'Update contract vehicle information' : 'Add a new GWAC, IDIQ, BPA, or other contract vehicle'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px' }}>

            {/* Basic Information */}
            <CollapsibleSection
              title="Basic Information"
              isOpen={sections.basic}
              onToggle={() => toggleSection('basic')}
              badge="Required"
            >
              <FormGrid columns={2}>
                <FormField label="Vehicle Name" required error={errors.name}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., OASIS+ 8(a)"
                  />
                </FormField>

                <FormField label="Vehicle Type" required error={errors.vehicleType}>
                  <select
                    className="form-select"
                    value={formData.vehicleType}
                    onChange={(e) => handleChange('vehicleType', e.target.value)}
                  >
                    <option value="">Select type</option>
                    {vehicleTypes.filter(t => t.isActive).map(type => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Agency" required error={errors.agency_id}>
                  <select
                    className="form-select"
                    value={formData.agency_id}
                    onChange={(e) => handleChange('agency_id', e.target.value)}
                  >
                    <option value="">Select agency</option>
                    {agencies.map(agency => (
                      <option key={agency.id} value={agency.id}>
                        {agency.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Status" required error={errors.status}>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    {vehicleStatuses.filter(s => s.isActive).map(status => (
                      <option key={status.id} value={status.name}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              </FormGrid>
            </CollapsibleSection>

            {/* Details */}
            <CollapsibleSection
              title="Details"
              isOpen={sections.details}
              onToggle={() => toggleSection('details')}
            >
              <FormGrid columns={2}>
                <FormField label="GovWin ID">
                  <input
                    type="text"
                    className="form-input"
                    value={formData.govwinId}
                    onChange={(e) => handleChange('govwinId', e.target.value)}
                    placeholder="e.g., OASIS-8A-2025"
                  />
                </FormField>

                <FormField label="Owner">
                  <input
                    type="text"
                    className="form-input"
                    value={formData.owner}
                    onChange={(e) => handleChange('owner', e.target.value)}
                    placeholder="e.g., GSA"
                  />
                </FormField>

                <FormField label="Set-Aside Type">
                  <input
                    type="text"
                    className="form-input"
                    value={formData.setAsideType}
                    onChange={(e) => handleChange('setAsideType', e.target.value)}
                    placeholder="e.g., 8(a), SDVOSB, Small Business"
                  />
                </FormField>
              </FormGrid>

              <FormGrid columns={1}>
                <FormField label="Description">
                  <textarea
                    className="form-textarea"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief description of the contract vehicle"
                    rows={3}
                  />
                </FormField>
              </FormGrid>
            </CollapsibleSection>

            {/* Timeline */}
            <CollapsibleSection
              title="Timeline"
              isOpen={sections.timeline}
              onToggle={() => toggleSection('timeline')}
            >
              <FormGrid columns={2}>
                <FormField label="Start Date">
                  <input
                    type="date"
                    className="form-input"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                  />
                </FormField>

                <FormField label="Expiration Date">
                  <input
                    type="date"
                    className="form-input"
                    value={formData.expirationDate}
                    onChange={(e) => handleChange('expirationDate', e.target.value)}
                  />
                </FormField>
              </FormGrid>
            </CollapsibleSection>

            {/* Financial Information */}
            <CollapsibleSection
              title="Financial Information"
              isOpen={sections.financial}
              onToggle={() => toggleSection('financial')}
            >
              <FormGrid columns={3}>
                <FormField label="Ceiling Value ($)">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.ceilingValue}
                    onChange={(e) => handleChange('ceilingValue', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                  />
                </FormField>

                <FormField label="Min Order Value ($)">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.minOrderValue}
                    onChange={(e) => handleChange('minOrderValue', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                  />
                </FormField>

                <FormField label="Max Order Value ($)">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.maxOrderValue}
                    onChange={(e) => handleChange('maxOrderValue', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                  />
                </FormField>
              </FormGrid>
            </CollapsibleSection>

            {/* Additional Information */}
            <CollapsibleSection
              title="Additional Information"
              isOpen={sections.additional}
              onToggle={() => toggleSection('additional')}
            >
              <FormGrid columns={1}>
                <FormField label="Notes">
                  <textarea
                    className="form-textarea"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Additional notes or comments"
                    rows={4}
                  />
                </FormField>
              </FormGrid>
            </CollapsibleSection>

          </div>

          {/* Footer Actions */}
          <div style={{
            padding: '20px 24px',
            background: '#f9fafb',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.background = 'white'}
            >
              <X style={{ width: '16px', height: '16px' }} />
              Cancel
            </button>
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Save style={{ width: '16px', height: '16px' }} />
              {isEditMode ? 'Save Changes' : 'Create Vehicle'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

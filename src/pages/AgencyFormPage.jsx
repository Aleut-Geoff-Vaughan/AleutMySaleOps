import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAgencies } from '../hooks/useAgencies';
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

export const AgencyFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { agencies, addAgency, updateAgency } = useAgencies();
  const { agencyTypes } = useApp();

  // Section collapse states
  const [sections, setSections] = useState({
    basic: true,
    location: true,
    contact: true
  });

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    agencyType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    website: ''
  });

  const [errors, setErrors] = useState({});

  // Load existing agency if editing
  useEffect(() => {
    if (isEditMode && id) {
      const agency = agencies.find(a => a.id === parseInt(id));
      if (agency) {
        setFormData(agency);
      }
    }
  }, [isEditMode, id, agencies]);

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
      newErrors.name = 'Agency name is required';
    }
    if (!formData.agencyType) {
      newErrors.agencyType = 'Agency type is required';
    }
    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state?.trim()) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditMode) {
      updateAgency(parseInt(id), formData);
    } else {
      addAgency(formData);
    }

    navigate('/agencies');
  };

  const handleCancel = () => {
    navigate('/agencies');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
          {isEditMode ? 'Edit Agency' : 'Create New Agency'}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          {isEditMode ? 'Update agency information' : 'Add a new government organization'}
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
                <FormField label="Agency Name" required error={errors.name}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter agency name"
                  />
                </FormField>

                <FormField label="Agency Type" required error={errors.agencyType}>
                  <select
                    className="form-select"
                    value={formData.agencyType}
                    onChange={(e) => handleChange('agencyType', e.target.value)}
                  >
                    <option value="">Select type</option>
                    {agencyTypes.filter(t => t.isActive).map(type => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              </FormGrid>
            </CollapsibleSection>

            {/* Location Information */}
            <CollapsibleSection
              title="Location Information"
              isOpen={sections.location}
              onToggle={() => toggleSection('location')}
              badge="Required"
            >
              <FormGrid columns={1}>
                <FormField label="Address" error={errors.address}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Street address"
                  />
                </FormField>
              </FormGrid>

              <FormGrid columns={3}>
                <FormField label="City" required error={errors.city}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="City"
                  />
                </FormField>

                <FormField label="State" required error={errors.state}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="State"
                    maxLength={2}
                  />
                </FormField>

                <FormField label="ZIP Code" error={errors.zip}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    placeholder="ZIP code"
                  />
                </FormField>
              </FormGrid>
            </CollapsibleSection>

            {/* Contact Information */}
            <CollapsibleSection
              title="Contact Information"
              isOpen={sections.contact}
              onToggle={() => toggleSection('contact')}
            >
              <FormGrid columns={2}>
                <FormField label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(XXX) XXX-XXXX"
                  />
                </FormField>

                <FormField label="Website" error={errors.website}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="example.gov"
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
              {isEditMode ? 'Save Changes' : 'Create Agency'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

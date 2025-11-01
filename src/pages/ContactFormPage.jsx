import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useContacts } from '../hooks/useContacts';
import { useAgencies } from '../hooks/useAgencies';
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

export const ContactFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { contacts, addContact, updateContact } = useContacts();
  const { agencies } = useAgencies();

  // Get preselected agency from navigation state (when clicking "Add Contact" from agency card)
  const preselectedAgencyId = location.state?.agencyId;

  // Section collapse states
  const [sections, setSections] = useState({
    basic: true,
    contact: true
  });

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Form state
  const [formData, setFormData] = useState({
    agencyId: preselectedAgencyId || '',
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({});

  // Load existing contact if editing
  useEffect(() => {
    if (isEditMode && id) {
      const contact = contacts.find(c => c.id === parseInt(id));
      if (contact) {
        setFormData(contact);
      }
    }
  }, [isEditMode, id, contacts]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.agencyId) {
      newErrors.agencyId = 'Agency is required';
    }
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
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
      updateContact(parseInt(id), formData);
    } else {
      addContact(formData);
    }

    // Navigate back to agencies page
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
          {isEditMode ? 'Edit Contact' : 'Create New Contact'}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          {isEditMode ? 'Update contact information' : 'Add a new contact to an agency'}
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
              <FormGrid columns={1}>
                <FormField label="Agency" required error={errors.agencyId}>
                  <select
                    className="form-select"
                    value={formData.agencyId}
                    onChange={(e) => handleChange('agencyId', parseInt(e.target.value))}
                  >
                    <option value="">Select agency</option>
                    {agencies.map(agency => (
                      <option key={agency.id} value={agency.id}>
                        {agency.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              </FormGrid>

              <FormGrid columns={2}>
                <FormField label="First Name" required error={errors.firstName}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </FormField>

                <FormField label="Last Name" required error={errors.lastName}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </FormField>
              </FormGrid>

              <FormGrid columns={1}>
                <FormField label="Title" error={errors.title}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Contracting Officer, Procurement Specialist"
                  />
                </FormField>
              </FormGrid>
            </CollapsibleSection>

            {/* Contact Information */}
            <CollapsibleSection
              title="Contact Information"
              isOpen={sections.contact}
              onToggle={() => toggleSection('contact')}
              badge="Required"
            >
              <FormGrid columns={1}>
                <FormField label="Email" required error={errors.email}>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@agency.gov"
                  />
                </FormField>
              </FormGrid>

              <FormGrid columns={2}>
                <FormField label="Office Phone" error={errors.phone}>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(XXX) XXX-XXXX"
                  />
                </FormField>

                <FormField label="Mobile Phone" error={errors.mobile}>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    placeholder="(XXX) XXX-XXXX"
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
              {isEditMode ? 'Save Changes' : 'Create Contact'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

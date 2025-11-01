import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgencies } from '../hooks/useAgencies';
import { useContacts } from '../hooks/useContacts';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Building2, Phone, Mail, Globe, Edit2, Trash2, UserPlus } from 'lucide-react';

const AgencyCard = ({ agency, canEdit, onEdit, onAddContact, onEditContact, onDeleteContact }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #f3f4f6',
        padding: '24px',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
        }}>
          <Building2 style={{ width: '28px', height: '28px', color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
            {agency.name}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
            {agency.agencyType}
          </p>
        </div>
      </div>

      {/* Location Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '8px'
      }}>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
            LOCATION
          </p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
            {agency.city}, {agency.state} {agency.zip}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
            ADDRESS
          </p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
            {agency.address}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {agency.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
            <span style={{ fontSize: '14px', color: '#374151' }}>{agency.phone}</span>
          </div>
        )}
        {agency.website && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
            <a
              href={`https://${agency.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                color: '#0B3D91',
                textDecoration: 'none',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              {agency.website}
            </a>
          </div>
        )}
      </div>

      {/* Contacts */}
      {agency.contacts.length > 0 && (
        <div>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Contacts ({agency.contacts.length})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {agency.contacts.map((contact) => (
              <div
                key={contact.id}
                style={{
                  padding: '12px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', color: '#111827', fontSize: '14px', marginBottom: '2px' }}>
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
                    {contact.title}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
                    <a
                      href={`mailto:${contact.email}`}
                      style={{
                        fontSize: '13px',
                        color: '#0B3D91',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                {canEdit && (
                  <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
                    <button
                      onClick={() => onEditContact(contact.id)}
                      style={{
                        padding: '6px',
                        background: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                      onMouseLeave={(e) => e.target.style.background = 'white'}
                      title="Edit contact"
                    >
                      <Edit2 style={{ width: '12px', height: '12px', color: '#374151' }} />
                    </button>
                    <button
                      onClick={() => onDeleteContact(contact.id)}
                      style={{
                        padding: '6px',
                        background: 'white',
                        border: '1px solid #fca5a5',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#fee2e2';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                      }}
                      title="Delete contact"
                    >
                      <Trash2 style={{ width: '12px', height: '12px', color: '#991b1b' }} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {canEdit && (
        <div style={{
          display: 'flex',
          gap: '8px',
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => onEdit(agency.id)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <Edit2 style={{ width: '14px', height: '14px' }} />
            Edit Agency
          </button>
          <button
            onClick={() => onAddContact(agency.id)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            <UserPlus style={{ width: '14px', height: '14px' }} />
            Add Contact
          </button>
        </div>
      )}
    </div>
  );
};

export const AgenciesPage = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { agenciesWithContacts } = useAgencies();
  const { deleteContact } = useContacts();
  const canEdit = userRole === 'admin' || userRole === 'sales';

  const handleCreateNew = useCallback(() => {
    navigate('/agencies/new');
  }, [navigate]);

  const handleEdit = useCallback((agencyId) => {
    navigate(`/agencies/${agencyId}/edit`);
  }, [navigate]);

  const handleAddContact = useCallback((agencyId) => {
    navigate('/contacts/new', { state: { agencyId } });
  }, [navigate]);

  const handleEditContact = useCallback((contactId) => {
    navigate(`/contacts/${contactId}/edit`);
  }, [navigate]);

  const handleDeleteContact = useCallback((contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contactId);
    }
  }, [deleteContact]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
            Agencies
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Manage government organizations and contacts
          </p>
        </div>
        {canEdit && (
          <button
            onClick={handleCreateNew}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            New Agency
          </button>
        )}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
        gap: '24px'
      }}>
        {agenciesWithContacts.map((agency) => (
          <AgencyCard
            key={agency.id}
            agency={agency}
            canEdit={canEdit}
            onEdit={handleEdit}
            onAddContact={handleAddContact}
            onEditContact={handleEditContact}
            onDeleteContact={handleDeleteContact}
          />
        ))}
      </div>
    </div>
  );
};

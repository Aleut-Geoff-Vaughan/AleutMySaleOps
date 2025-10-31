import { useState, useMemo, useCallback } from 'react';
import { useOpportunities } from '../hooks/useOpportunities';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import OpportunityForm from '../components/OpportunityForm';

const stageBadgeColors = {
  'Prospecting': { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  'Qualification': { bg: '#e0e7ff', text: '#4338ca', border: '#a5b4fc' },
  'Proposal': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  'Negotiation': { bg: '#fed7aa', text: '#9a3412', border: '#fdba74' },
  'Closed Won': { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  'Closed Lost': { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' }
};

export const OpportunitiesPage = () => {
  const { userRole } = useAuth();
  const { activeStages } = useApp();
  const {
    getAgencyName,
    filterOpportunities,
    sortOpportunities,
    deleteOpportunity
  } = useOpportunities();

  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [sortBy, setSortBy] = useState('opportunity_name');
  const [sortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [formData, setFormData] = useState({});

  const filteredOpportunities = useMemo(() => {
    const filtered = filterOpportunities(searchTerm, stageFilter);
    return sortOpportunities(filtered, sortBy, sortOrder);
  }, [searchTerm, stageFilter, sortBy, sortOrder, filterOpportunities, sortOpportunities]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      deleteOpportunity(id);
    }
  }, [deleteOpportunity]);

  const handleOpenModal = useCallback((opportunity = null) => {
    console.log('🔵 handleOpenModal called with:', opportunity);
    setEditingOpportunity(opportunity);
    setFormData(opportunity || {});
    setIsModalOpen(true);
    console.log('🟢 Modal state set to true');
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingOpportunity(null);
    setFormData({});
  }, []);

  const handleSubmit = useCallback(() => {
    // TODO: Implement save logic using useOpportunities hook
    console.log('Saving opportunity:', formData);
    handleCloseModal();
  }, [formData, handleCloseModal]);

  const canEdit = userRole === 'admin' || userRole === 'sales';

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
            Opportunities
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Manage your sales pipeline
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => handleOpenModal()}
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
            New Opportunity
          </button>
        )}
      </div>

      {/* Card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden'
      }}>
        {/* Filters */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          background: 'rgba(249, 250, 251, 0.5)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Stage Filter */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="">All Stages</option>
              {activeStages.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="opportunity_name">Sort by Name</option>
              <option value="value">Sort by Value</option>
              <option value="close_date">Sort by Close Date</option>
              <option value="probability">Sort by Probability</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Opportunity</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Agency</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Stage</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Value</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Probability</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Close Date</th>
                {canEdit && (
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #e5e7eb'
                  }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opp) => {
                  const colors = stageBadgeColors[opp.stage] || stageBadgeColors['Prospecting'];
                  return (
                    <tr key={opp.id} style={{
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827'
                      }}>{opp.opportunity_name}</td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>{getAgencyName(opp.agency_id)}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          display: 'inline-flex',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`
                        }}>
                          {opp.stage}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827'
                      }}>${(opp.value || 0).toLocaleString()}</td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>{opp.probability}%</td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>{opp.close_date}</td>
                      {canEdit && (
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenModal(opp)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 12px',
                                background: '#f3f4f6',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#e5e7eb';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = '#f3f4f6';
                              }}
                            >
                              <Edit2 style={{ width: '14px', height: '14px' }} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(opp.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 12px',
                                background: '#fee2e2',
                                border: '1px solid #fca5a5',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#991b1b',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#fecaca';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = '#fee2e2';
                              }}
                            >
                              <Trash2 style={{ width: '14px', height: '14px' }} />
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={canEdit ? 7 : 6}
                    style={{
                      padding: '48px 24px',
                      textAlign: 'center',
                      color: '#9ca3af',
                      fontSize: '14px'
                    }}
                  >
                    No opportunities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Opportunity Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingOpportunity ? 'Edit Opportunity' : 'New Opportunity'}
        size="lg"
      >
        <OpportunityForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

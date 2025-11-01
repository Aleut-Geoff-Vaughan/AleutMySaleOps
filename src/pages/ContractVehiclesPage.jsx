import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContractVehicles } from '../hooks/useContractVehicles';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit2, Trash2, Search, FileText } from 'lucide-react';

const statusBadgeColors = {
  'Active': { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  'Pending': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  'Expired': { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  'Inactive': { bg: '#e5e7eb', text: '#374151', border: '#d1d5db' }
};

export const ContractVehiclesPage = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { activeVehicleTypes, activeVehicleStatuses } = useApp();
  const {
    contractVehiclesWithDetails,
    deleteContractVehicle
  } = useContractVehicles();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredVehicles = useMemo(() => {
    let filtered = contractVehiclesWithDetails;

    // Search filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(v =>
        v.name.toLowerCase().includes(lower) ||
        v.description?.toLowerCase().includes(lower) ||
        v.govwinId?.toLowerCase().includes(lower) ||
        v.agencyName.toLowerCase().includes(lower)
      );
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter(v => v.vehicleType === typeFilter);
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(v => v.status === statusFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.vehicleType.localeCompare(b.vehicleType);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'expirationDate':
          return (a.expirationDate || '').localeCompare(b.expirationDate || '');
        case 'opportunities':
          return b.opportunityCount - a.opportunityCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [contractVehiclesWithDetails, searchTerm, typeFilter, statusFilter, sortBy]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this contract vehicle?')) {
      deleteContractVehicle(id);
    }
  }, [deleteContractVehicle]);

  const handleCreateNew = useCallback(() => {
    navigate('/contract-vehicles/new');
  }, [navigate]);

  const handleEdit = useCallback((vehicleId) => {
    navigate(`/contract-vehicles/${vehicleId}/edit`);
  }, [navigate]);

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
            Contract Vehicles
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Manage GWACs, IDIQs, BPAs, and other contract vehicles
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
            New Contract Vehicle
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
                placeholder="Search vehicles..."
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

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
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
              <option value="">All Types</option>
              {activeVehicleTypes.map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
              <option value="">All Statuses</option>
              {activeVehicleStatuses.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
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
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
              <option value="status">Sort by Status</option>
              <option value="expirationDate">Sort by Expiration</option>
              <option value="opportunities">Sort by Opportunities</option>
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
                }}>Vehicle Name</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Type</th>
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
                }}>Status</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Expiration</th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid #e5e7eb'
                }}>Opportunities</th>
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
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => {
                  const colors = statusBadgeColors[vehicle.status] || statusBadgeColors['Active'];
                  return (
                    <tr key={vehicle.id} style={{
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{
                        padding: '16px 24px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                          <div>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#111827'
                            }}>{vehicle.name}</div>
                            {vehicle.govwinId && (
                              <div style={{
                                fontSize: '12px',
                                color: '#9ca3af'
                              }}>{vehicle.govwinId}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>{vehicle.vehicleType}</td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>{vehicle.agencyName}</td>
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
                          {vehicle.status}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>{vehicle.expirationDate || 'N/A'}</td>
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827'
                      }}>{vehicle.opportunityCount}</td>
                      {canEdit && (
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleEdit(vehicle.id)}
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
                              onClick={() => handleDelete(vehicle.id)}
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
                    No contract vehicles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useEntities } from '../hooks/useEntities';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Building2, TrendingUp, DollarSign } from 'lucide-react';

const EntityCard = ({ entity, canEdit }) => {
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
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
        }}>
          <Building2 style={{ width: '28px', height: '28px', color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
            {entity.name}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            EIN: {entity.ein}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: '#d1fae5',
          borderRadius: '8px'
        }}>
          <DollarSign style={{ width: '20px', height: '20px', color: '#065f46', margin: '0 auto 4px' }} />
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Won</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>
            ${(entity.stats.won / 1000).toFixed(0)}K
          </p>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: '#dbeafe',
          borderRadius: '8px'
        }}>
          <TrendingUp style={{ width: '20px', height: '20px', color: '#1e40af', margin: '0 auto 4px' }} />
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Pipeline</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>
            ${(entity.stats.pipeline / 1000).toFixed(0)}K
          </p>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: '#e9d5ff',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Opps</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>
            {entity.stats.count}
          </p>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Certifications
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {entity.certifications.map((cert, idx) => (
            <span
              key={idx}
              style={{
                padding: '4px 12px',
                background: '#dbeafe',
                color: '#1e40af',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                border: '1px solid #93c5fd'
              }}
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        fontSize: '14px'
      }}>
        <div>
          <p style={{ color: '#6b7280', marginBottom: '2px' }}>State</p>
          <p style={{ fontWeight: '600', color: '#111827' }}>{entity.state}</p>
        </div>
        <div>
          <p style={{ color: '#6b7280', marginBottom: '2px' }}>Formation Date</p>
          <p style={{ fontWeight: '600', color: '#111827' }}>{entity.formationDate}</p>
        </div>
        <div>
          <p style={{ color: '#6b7280', marginBottom: '2px' }}>SBA Reporting Due</p>
          <p style={{ fontWeight: '600', color: '#ea580c' }}>{entity.sbaReportingDue}</p>
        </div>
        <div>
          <p style={{ color: '#6b7280', marginBottom: '2px' }}>Documents</p>
          <p style={{ fontWeight: '600', color: '#111827' }}>{entity.documents.length}</p>
        </div>
      </div>

      {/* Notes */}
      {entity.notes && (
        <div style={{ fontSize: '14px' }}>
          <p style={{ color: '#6b7280', marginBottom: '4px' }}>Notes</p>
          <p style={{ color: '#374151' }}>{entity.notes}</p>
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
          <button style={{
            flex: 1,
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
            Edit Entity
          </button>
          <button style={{
            flex: 1,
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
            Manage Documents
          </button>
        </div>
      )}
    </div>
  );
};

export const EntitiesPage = () => {
  const { userRole } = useAuth();
  const { entitiesWithStats } = useEntities();
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
            Entity Management
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Manage LLCs, certifications, and compliance
          </p>
        </div>
        {canEdit && (
          <button style={{
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
            New Entity
          </button>
        )}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
        gap: '24px'
      }}>
        {entitiesWithStats.map((entity) => (
          <EntityCard key={entity.id} entity={entity} canEdit={canEdit} />
        ))}
      </div>
    </div>
  );
};

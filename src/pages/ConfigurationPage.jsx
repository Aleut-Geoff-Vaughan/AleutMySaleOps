import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Settings, Plus } from 'lucide-react';

const ConfigSection = ({ title, items, type }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      overflow: 'hidden'
    }}>
      {/* Card Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #e5e7eb',
        background: 'rgba(249, 250, 251, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
          {title}
        </h3>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <Plus style={{ width: '14px', height: '14px' }} />
          Add {type}
        </button>
      </div>

      {/* Card Body */}
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: hoveredId === item.id ? '#f3f4f6' : '#f9fafb',
                borderRadius: '8px',
                transition: 'background 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span style={{ fontWeight: '500', color: '#111827', fontSize: '14px' }}>
                {item.name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: item.isActive ? '#d1fae5' : '#e5e7eb',
                  color: item.isActive ? '#065f46' : '#6b7280',
                  border: item.isActive ? '1px solid #6ee7b7' : '1px solid #d1d5db'
                }}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
                <button style={{
                  padding: '6px 12px',
                  background: 'transparent',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ConfigurationPage = () => {
  const { stages, capabilityGroups, capabilities, agencyTypes, forecastGroups } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
          Configuration
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Manage system settings and customizations
        </p>
      </div>

      {/* Config Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '24px'
      }}>
        <ConfigSection title="Pipeline Stages" items={stages} type="Stage" />
        <ConfigSection title="Agency Types" items={agencyTypes} type="Agency Type" />
        <ConfigSection title="Capability Groups" items={capabilityGroups} type="Group" />
        <ConfigSection title="Capabilities" items={capabilities} type="Capability" />
        <ConfigSection title="Forecast Groups" items={forecastGroups} type="Group" />

        {/* System Settings Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            background: 'rgba(249, 250, 251, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Settings style={{ width: '24px', height: '24px', color: '#9ca3af' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
              System Settings
            </h3>
          </div>
          <div style={{ padding: '24px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Additional system configuration options will be available here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

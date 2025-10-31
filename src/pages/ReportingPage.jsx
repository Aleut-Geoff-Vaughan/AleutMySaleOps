import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { BarChart3, ExternalLink } from 'lucide-react';

const ReportCard = ({ report }) => {
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
        gap: '16px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px -1px rgba(249, 115, 22, 0.3)'
        }}>
          <BarChart3 style={{ width: '32px', height: '32px', color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            {report.name}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            {report.description}
          </p>
        </div>
      </div>

      <a
        href={report.embedUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px 20px',
          background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
          color: 'white',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.2s',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        Open Report
        <ExternalLink style={{ width: '16px', height: '16px' }} />
      </a>
    </div>
  );
};

export const ReportingPage = () => {
  const { powerBIReports } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
          Reporting & Analytics
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Access Power BI reports and analytics dashboards
        </p>
      </div>

      {/* Reports Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {powerBIReports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      {/* Coming Soon Card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #f3f4f6',
        padding: '48px 24px',
        textAlign: 'center'
      }}>
        <BarChart3 style={{
          width: '64px',
          height: '64px',
          color: '#9ca3af',
          margin: '0 auto 16px'
        }} />
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          Coming Soon
        </h3>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Additional embedded Power BI reports and custom analytics will be available here.
        </p>
      </div>
    </div>
  );
};

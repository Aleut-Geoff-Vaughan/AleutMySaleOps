import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOpportunities } from '../hooks/useOpportunities';
import {
  Briefcase,
  Building2,
  Target,
  BarChart3,
  Settings,
  Users,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, bgColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
        border: '1px solid #f3f4f6',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{label}</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{value}</p>
        </div>
      </div>
    </div>
  );
};

const TileButton = ({ icon: Icon, title, description, onClick, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        background: gradient,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s',
        textAlign: 'left',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s'
        }}>
          <Icon style={{ width: '32px', height: '32px', color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            {title}
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>{description}</p>
        </div>
      </div>
    </button>
  );
};

const OpportunityRow = ({ opp, navigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        background: isHovered ? '#f3f4f6' : '#f9fafb',
        borderRadius: '8px',
        transition: 'background 0.2s',
        cursor: 'pointer',
        border: '1px solid #e5e7eb'
      }}
      onClick={() => navigate('/opportunities')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ flex: 1 }}>
        <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
          {opp.opportunity_name}
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>Stage: {opp.stage}</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontWeight: 'bold', color: '#0B3D91', marginBottom: '4px' }}>
          ${(opp.value / 1000).toFixed(0)}K
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>{opp.probability}% probability</p>
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { opportunities, calculateStats } = useOpportunities();
  const stats = useMemo(() => calculateStats, [calculateStats]);

  const recentOpportunities = useMemo(() => {
    return opportunities
      .filter(opp => !opp.stage.includes('Closed'))
      .slice(0, 5);
  }, [opportunities]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Welcome to your sales operations center
        </p>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        <StatCard
          icon={DollarSign}
          label="Total Pipeline"
          value={`$${(stats.total / 1000000).toFixed(1)}M`}
          bgColor="#3b82f6"
        />
        <StatCard
          icon={TrendingUp}
          label="Weighted Pipeline"
          value={`$${(stats.weighted / 1000000).toFixed(1)}M`}
          bgColor="#10b981"
        />
        <StatCard
          icon={Activity}
          label="Active Opportunities"
          value={stats.active}
          bgColor="#a855f7"
        />
        <StatCard
          icon={Target}
          label="Closed Won"
          value={stats.won}
          bgColor="#f59e0b"
        />
      </div>

      {/* Main Navigation Tiles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <TileButton
          icon={Briefcase}
          title="Sales Management"
          description="Manage opportunities, agencies, and contacts"
          onClick={() => navigate('/opportunities')}
          gradient="linear-gradient(135deg, #667eea 0%, #2563eb 100%)"
        />
        <TileButton
          icon={Building2}
          title="Entity Management"
          description="Track LLCs, certifications, and compliance"
          onClick={() => navigate('/entities')}
          gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <TileButton
          icon={Target}
          title="Forecasts & Targets"
          description="Set and monitor sales targets and forecasts"
          onClick={() => navigate('/forecasts')}
          gradient="linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)"
        />
        <TileButton
          icon={BarChart3}
          title="Reporting"
          description="View analytics and Power BI reports"
          onClick={() => navigate('/reporting')}
          gradient="linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
        />
        <TileButton
          icon={Settings}
          title="Configuration"
          description="Manage system settings and customizations"
          onClick={() => navigate('/configuration')}
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
        <TileButton
          icon={Users}
          title="User Management"
          description="Manage users and permissions"
          onClick={() => navigate('/users')}
          gradient="linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
        />
      </div>

      {/* Recent Opportunities */}
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
          background: 'rgba(249, 250, 251, 0.5)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
            Recent Active Opportunities
          </h2>
        </div>
        <div style={{ padding: '24px' }}>
          {recentOpportunities.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentOpportunities.map((opp) => (
                <OpportunityRow key={opp.id} opp={opp} navigate={navigate} />
              ))}
            </div>
          ) : (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '32px 0' }}>
              No active opportunities
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

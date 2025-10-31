import { useState } from 'react';
import { useForecasts } from '../hooks/useForecasts';
import { useAuth } from '../contexts/AuthContext';
import { Target, TrendingUp, DollarSign, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: gradient,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon style={{ width: '48px', height: '48px', color: 'white' }} />
      <div>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', marginBottom: '4px' }}>
          {label}
        </p>
        <p style={{ fontSize: '30px', fontWeight: 'bold', color: 'white' }}>
          {value}
        </p>
      </div>
    </div>
  );
};

const ForecastGroup = ({ group, getForecastGroupName }) => {
  const attainment = (group.actual / group.target) * 100;
  const pipelineCoverage = (group.pipeline / (group.target - group.actual)) * 100;

  return (
    <div style={{
      padding: '24px',
      background: '#f9fafb',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
          {getForecastGroupName(group.groupId)}
        </h3>
        <span style={{
          fontSize: '14px',
          fontWeight: '600',
          color: attainment >= 80 ? '#065f46' : attainment >= 50 ? '#92400e' : '#991b1b'
        }}>
          {attainment.toFixed(1)}% Attainment
        </span>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div style={{
          padding: '16px',
          background: '#dbeafe',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Target</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
            ${(group.target / 1000000).toFixed(2)}M
          </p>
        </div>
        <div style={{
          padding: '16px',
          background: '#d1fae5',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Actual</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
            ${(group.actual / 1000000).toFixed(2)}M
          </p>
        </div>
        <div style={{
          padding: '16px',
          background: '#e9d5ff',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Pipeline</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
            ${(group.pipeline / 1000000).toFixed(2)}M
          </p>
        </div>
      </div>

      {/* Progress to Target */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          <span style={{ color: '#6b7280' }}>Progress to Target</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>{attainment.toFixed(1)}%</span>
        </div>
        <div style={{
          width: '100%',
          background: '#e5e7eb',
          borderRadius: '9999px',
          height: '12px'
        }}>
          <div style={{
            height: '12px',
            borderRadius: '9999px',
            background: attainment >= 80 ? '#10b981' : attainment >= 50 ? '#eab308' : '#ef4444',
            width: `${Math.min(attainment, 100)}%`,
            transition: 'all 0.3s'
          }} />
        </div>
      </div>

      {/* Pipeline Coverage */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          <span style={{ color: '#6b7280' }}>Pipeline Coverage</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>{pipelineCoverage.toFixed(1)}%</span>
        </div>
        <div style={{
          width: '100%',
          background: '#e5e7eb',
          borderRadius: '9999px',
          height: '12px'
        }}>
          <div style={{
            height: '12px',
            borderRadius: '9999px',
            background: pipelineCoverage >= 100 ? '#10b981' : pipelineCoverage >= 50 ? '#eab308' : '#ef4444',
            width: `${Math.min(pipelineCoverage, 100)}%`,
            transition: 'all 0.3s'
          }} />
        </div>
      </div>
    </div>
  );
};

export const ForecastsPage = () => {
  const { userRole } = useAuth();
  const { forecasts, getForecastGroupName, calculateTotals } = useForecasts();
  const canEdit = userRole === 'admin' || userRole === 'sales';
  const totals = calculateTotals;

  const currentForecast = forecasts[0];

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
            Forecasts & Targets
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Monitor sales targets and forecast performance
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
            <Target style={{ width: '16px', height: '16px' }} />
            Update Forecast
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        <StatCard
          icon={Target}
          label="Total Target"
          value={`$${(totals.target / 1000000).toFixed(1)}M`}
          gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
        />
        <StatCard
          icon={DollarSign}
          label="Total Actual"
          value={`$${(totals.actual / 1000000).toFixed(1)}M`}
          gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Pipeline"
          value={`$${(totals.pipeline / 1000000).toFixed(1)}M`}
          gradient="linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)"
        />
      </div>

      {/* Forecast Details */}
      {currentForecast && (
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
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                FY {currentForecast.fiscalYear} Forecast
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Last updated: {currentForecast.lastUpdated}
              </p>
            </div>
            <Activity style={{ width: '24px', height: '24px', color: '#9ca3af' }} />
          </div>

          {/* Card Body */}
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {currentForecast.groups.map((group) => (
                <ForecastGroup
                  key={group.groupId}
                  group={group}
                  getForecastGroupName={getForecastGroupName}
                />
              ))}
            </div>

            {/* Notes */}
            {currentForecast.notes && (
              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: '#dbeafe',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                  Notes
                </p>
                <p style={{ fontSize: '14px', color: '#374151' }}>
                  {currentForecast.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

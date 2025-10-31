import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, TrendingUp, Lock, User } from 'lucide-react';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Main Login Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        border: '1px solid #f3f4f6'
      }}>
        {/* Header Section with Brand Colors */}
        <div style={{
          background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
          padding: '48px 32px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 20px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <TrendingUp style={{ width: '48px', height: '48px', color: 'white', strokeWidth: 2.5 }} />
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px',
            letterSpacing: '-0.025em'
          }}>
            mySalesOps
          </h1>
          <p style={{
            color: '#dbeafe',
            fontSize: '16px',
            fontWeight: '500',
            letterSpacing: '0.025em'
          }}>
            Business Management System
          </p>
        </div>

        {/* Form Section */}
        <div style={{ padding: '40px 32px' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Welcome Back
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  bottom: '0',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <User style={{ height: '20px', width: '20px', color: '#6b7280' }} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  placeholder="Enter username"
                  style={{
                    display: 'block',
                    width: '100%',
                    paddingLeft: '48px',
                    paddingRight: '16px',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    fontSize: '16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  bottom: '0',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <Lock style={{ height: '20px', width: '20px', color: '#6b7280' }} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  style={{
                    display: 'block',
                    width: '100%',
                    paddingLeft: '48px',
                    paddingRight: '16px',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    fontSize: '16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                  }}
                />
              </div>
            </div>

            {loginError && (
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px',
                background: '#fef2f2',
                border: '2px solid #fca5a5',
                color: '#991b1b',
                borderRadius: '12px'
              }}>
                <AlertCircle style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
                color: 'white',
                fontWeight: 'bold',
                padding: '16px 24px',
                borderRadius: '12px',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.target.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '2px solid #e5e7eb' }}>
            <div style={{
              background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid #bfdbfe',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: '#3b82f6',
                  borderRadius: '50%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}></div>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0
                }}>
                  Demo Credentials
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Admin:', cred: 'admin / admin123' },
                  { label: 'Sales:', cred: 'sales / sales123' },
                  { label: 'Viewer:', cred: 'viewer / viewer123' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    border: '1px solid #dbeafe'
                  }}>
                    <span style={{
                      color: '#374151',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      {item.label}
                    </span>
                    <code style={{
                      background: '#eff6ff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      color: '#1d4ed8',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      border: '1px solid #bfdbfe'
                    }}>
                      {item.cred}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <p style={{
          fontSize: '16px',
          fontWeight: '500',
          color: 'white',
          opacity: 0.9,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          margin: 0
        }}>
          © 2024 Aleut Federal. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

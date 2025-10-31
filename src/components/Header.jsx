import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      background: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #f3f4f6'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <TrendingUp style={{ height: '28px', width: '28px', color: 'white' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#0f172a',
              margin: 0,
              lineHeight: '1.2'
            }}>
              mySalesOps
            </h1>
            <p style={{
              fontSize: '12px',
              color: '#64748b',
              margin: 0
            }}>
              Business Management System
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              marginBottom: '2px'
            }}>
              Signed in as
            </div>
            <div style={{
              fontWeight: '500',
              color: '#0f172a',
              fontSize: '14px'
            }}>
              {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User'}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: isHovered ? '#f9fafb' : 'white',
              color: '#374151',
              padding: '8px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

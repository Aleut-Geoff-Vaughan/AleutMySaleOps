import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, List, Building2, Target, BarChart3, Settings, Menu, X, Briefcase, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const NavButton = ({ to, children, onClick }) => {
  const location = useLocation();
  const active = location.pathname === to;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '8px',
        transition: 'all 0.2s',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: active ? '500' : '400',
        background: active ? '#f1f5f9' : (isHovered ? '#f8fafc' : 'transparent'),
        color: active ? '#0B3D91' : '#374151'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </NavLink>
  );
};

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const { userRole } = useAuth();

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0'
        }}>
          {/* Desktop menu */}
          <div style={{
            display: 'none',
            '@media (min-width: 1024px)': { display: 'flex' },
            alignItems: 'center',
            gap: '4px'
          }} className="hidden lg:flex items-center space-x-1">
            <NavButton to="/">
              <Home style={{ width: '16px', height: '16px' }} /> Dashboard
            </NavButton>
            <NavButton to="/opportunities">
              <List style={{ width: '16px', height: '16px' }} /> Opportunities
            </NavButton>
            <NavButton to="/agencies">
              <Briefcase style={{ width: '16px', height: '16px' }} /> Agencies
            </NavButton>
            <NavButton to="/contract-vehicles">
              <FileText style={{ width: '16px', height: '16px' }} /> Contract Vehicles
            </NavButton>
            <NavButton to="/entities">
              <Building2 style={{ width: '16px', height: '16px' }} /> Entities
            </NavButton>
            <NavButton to="/forecasts">
              <Target style={{ width: '16px', height: '16px' }} /> Forecasts
            </NavButton>
            <NavButton to="/reporting">
              <BarChart3 style={{ width: '16px', height: '16px' }} /> Reports
            </NavButton>
            {userRole === 'admin' && (
              <NavButton to="/configuration">
                <Settings style={{ width: '16px', height: '16px' }} /> Configuration
              </NavButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="lg:hidden">
            <button
              aria-label="Toggle menu"
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: open ? '#f1f5f9' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setOpen(prev => !prev)}
            >
              {open ? <X style={{ width: '20px', height: '20px' }} /> : <Menu style={{ width: '20px', height: '20px' }} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div style={{
          display: open ? 'block' : 'none',
          paddingBottom: '16px'
        }} className="lg:hidden">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }} onClick={() => setOpen(false)}>
            <NavButton to="/" onClick={() => setOpen(false)}>
              <Home style={{ width: '16px', height: '16px' }} /> Dashboard
            </NavButton>
            <NavButton to="/opportunities" onClick={() => setOpen(false)}>
              <List style={{ width: '16px', height: '16px' }} /> Opportunities
            </NavButton>
            <NavButton to="/agencies" onClick={() => setOpen(false)}>
              <Briefcase style={{ width: '16px', height: '16px' }} /> Agencies
            </NavButton>
            <NavButton to="/contract-vehicles" onClick={() => setOpen(false)}>
              <FileText style={{ width: '16px', height: '16px' }} /> Contract Vehicles
            </NavButton>
            <NavButton to="/entities" onClick={() => setOpen(false)}>
              <Building2 style={{ width: '16px', height: '16px' }} /> Entities
            </NavButton>
            <NavButton to="/forecasts" onClick={() => setOpen(false)}>
              <Target style={{ width: '16px', height: '16px' }} /> Forecasts
            </NavButton>
            <NavButton to="/reporting" onClick={() => setOpen(false)}>
              <BarChart3 style={{ width: '16px', height: '16px' }} /> Reports
            </NavButton>
            {userRole === 'admin' && (
              <NavButton to="/configuration" onClick={() => setOpen(false)}>
                <Settings style={{ width: '16px', height: '16px' }} /> Configuration
              </NavButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

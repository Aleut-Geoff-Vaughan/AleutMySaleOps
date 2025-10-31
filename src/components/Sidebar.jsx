import React from 'react';

const Sidebar = ({ activeView, setActiveView }) => (
  <aside className="app-sidebar hidden md:block">
    <nav className="space-y-2">
      <button onClick={() => setActiveView('dashboard')} className={`sidebar-link ${activeView === 'dashboard' ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}>Dashboard</button>
      <button onClick={() => setActiveView('opportunities')} className={`sidebar-link ${activeView === 'opportunities' ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}>Opportunities</button>
      <button onClick={() => setActiveView('entities')} className={`sidebar-link ${activeView === 'entities' ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}>Entities</button>
      <button onClick={() => setActiveView('forecasts')} className={`sidebar-link ${activeView === 'forecasts' ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}>Forecasts</button>
      <button onClick={() => setActiveView('reports')} className={`sidebar-link ${activeView === 'reports' ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}>Reports</button>
      <button onClick={() => setActiveView('settings')} className={`sidebar-link ${activeView === 'settings' ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}>Settings</button>
    </nav>
  </aside>
);

export default Sidebar;

import React, { useState } from 'react';
import { Home, List, Building2, Target, BarChart3, Settings, Users, Menu, X } from 'lucide-react';

const NavButton = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${active ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
    {children}
  </button>
);

const TopNav = ({ activeView, setActiveView }) => {
  const [open, setOpen] = useState(false);

  const handleNav = (view) => {
    setActiveView(view);
    setOpen(false);
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="hidden lg:flex items-center space-x-4">
            <NavButton active={activeView==='dashboard'} onClick={() => handleNav('dashboard')}><Home className="w-4 h-4" /> Dashboard</NavButton>
            <NavButton active={activeView==='opportunities'} onClick={() => handleNav('opportunities')}><List className="w-4 h-4" /> Opportunities</NavButton>
            <NavButton active={activeView==='entities'} onClick={() => handleNav('entities')}><Building2 className="w-4 h-4" /> Entities</NavButton>
            <NavButton active={activeView==='forecasts'} onClick={() => handleNav('forecasts')}><Target className="w-4 h-4" /> Forecasts</NavButton>
            <NavButton active={activeView==='reports'} onClick={() => handleNav('reports')}><BarChart3 className="w-4 h-4" /> Reports</NavButton>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block" />
            <div className="hidden lg:flex items-center gap-3">
              <NavButton active={activeView==='settings'} onClick={() => handleNav('settings')}><Settings className="w-4 h-4" /> Settings</NavButton>
              <NavButton active={activeView==='users'} onClick={() => handleNav('users')}><Users className="w-4 h-4" /> Users</NavButton>
            </div>

            <button aria-label="Toggle menu" className="lg:hidden p-2 rounded-md hover:bg-slate-100" onClick={() => setOpen(prev => !prev)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${open ? 'block' : 'hidden'} pb-4`}>
          <div className="space-y-2">
            <NavButton active={activeView==='dashboard'} onClick={() => handleNav('dashboard')}><Home className="w-4 h-4" /> Dashboard</NavButton>
            <NavButton active={activeView==='opportunities'} onClick={() => handleNav('opportunities')}><List className="w-4 h-4" /> Opportunities</NavButton>
            <NavButton active={activeView==='entities'} onClick={() => handleNav('entities')}><Building2 className="w-4 h-4" /> Entities</NavButton>
            <NavButton active={activeView==='forecasts'} onClick={() => handleNav('forecasts')}><Target className="w-4 h-4" /> Forecasts</NavButton>
            <NavButton active={activeView==='reports'} onClick={() => handleNav('reports')}><BarChart3 className="w-4 h-4" /> Reports</NavButton>
            <NavButton active={activeView==='settings'} onClick={() => handleNav('settings')}><Settings className="w-4 h-4" /> Settings</NavButton>
            <NavButton active={activeView==='users'} onClick={() => handleNav('users')}><Users className="w-4 h-4" /> Users</NavButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

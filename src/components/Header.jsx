import React from 'react';

const Header = ({ currentUser, onLogout }) => (
  <div className="app-header">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center justify-center w-12 h-12">
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Aleut Federal" className="h-10 w-auto" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">mySalesOps</h1>
          <p className="text-xs text-slate-500">Business Management System</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm text-slate-500">Signed in as</div>
          <div className="font-medium text-slate-900">{currentUser}</div>
        </div>
        <button onClick={onLogout} className="btn-secondary">Sign out</button>
      </div>
    </div>
  </div>
);

export default Header;

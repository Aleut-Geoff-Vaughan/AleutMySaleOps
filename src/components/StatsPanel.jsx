import React from 'react';

const StatsPanel = ({ stats = {} }) => {
  const { total = 0, weighted = 0, active = 0, won = 0 } = stats;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="stats-card">
        <div className="text-sm text-slate-500">Total Pipeline</div>
        <div className="text-lg font-semibold">${total.toLocaleString()}</div>
      </div>
      <div className="stats-card">
        <div className="text-sm text-slate-500">Weighted</div>
        <div className="text-lg font-semibold">${weighted.toLocaleString()}</div>
      </div>
      <div className="stats-card">
        <div className="text-sm text-slate-500">Active Opps</div>
        <div className="text-lg font-semibold">{active}</div>
      </div>
      <div className="stats-card">
        <div className="text-sm text-slate-500">Closed Won</div>
        <div className="text-lg font-semibold">{won}</div>
      </div>
    </div>
  );
};

export default StatsPanel;

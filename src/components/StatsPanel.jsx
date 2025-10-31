import React from 'react';

const StatsPanel = ({ stats = {} }) => {
  const { total = 0, weighted = 0, active = 0, won = 0 } = stats;
  return (
    <div className="p-4 bg-white border rounded-md grid grid-cols-4 gap-4">
      <div>
        <div className="text-sm text-gray-500">Total Pipeline</div>
        <div className="text-lg font-semibold">${total.toLocaleString()}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Weighted</div>
        <div className="text-lg font-semibold">${weighted.toLocaleString()}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Active Opps</div>
        <div className="text-lg font-semibold">{active}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Closed Won</div>
        <div className="text-lg font-semibold">{won}</div>
      </div>
    </div>
  );
};

export default StatsPanel;

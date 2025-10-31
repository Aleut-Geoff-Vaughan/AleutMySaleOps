import React from 'react';

const OpportunityList = ({ opportunities = [], getAgencyName = () => 'Unknown', getContactName = () => 'Unknown', openForm = () => {}, handleDelete = () => {} }) => {
  if (!opportunities.length) {
    return <div className="p-4 card">No opportunities</div>;
  }

  return (
    <div className="space-y-3">
      {opportunities.map((opp) => (
        <div key={opp.id} className="card p-3 flex items-center justify-between">
          <div>
            <div className="font-medium text-slate-900">{opp.opportunity_name}</div>
            <div className="text-sm text-slate-500">{getAgencyName(opp.agency_id)} • {getContactName(opp.primary_contact_id)}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => openForm(opp, 'opportunity')} className="btn-secondary px-3 py-1">Edit</button>
            <button onClick={() => handleDelete(opp.id, 'opportunity')} className="btn-danger px-3 py-1">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpportunityList;

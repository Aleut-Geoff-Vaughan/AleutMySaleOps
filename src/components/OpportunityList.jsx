import React from 'react';

const OpportunityList = ({ opportunities = [], getAgencyName = () => 'Unknown', getContactName = () => 'Unknown', openForm = () => {}, handleDelete = () => {} }) => {
  if (!opportunities.length) {
    return <div className="p-4 bg-white border rounded">No opportunities</div>;
  }

  return (
    <div className="space-y-3">
      {opportunities.map((opp) => (
        <div key={opp.id} className="p-3 bg-white border rounded flex items-center justify-between">
          <div>
            <div className="font-medium">{opp.opportunity_name}</div>
            <div className="text-sm text-gray-500">{getAgencyName(opp.agency_id)} • {getContactName(opp.primary_contact_id)}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => openForm(opp, 'opportunity')} className="px-2 py-1 bg-yellow-100 rounded">Edit</button>
            <button onClick={() => handleDelete(opp.id, 'opportunity')} className="px-2 py-1 bg-red-100 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpportunityList;

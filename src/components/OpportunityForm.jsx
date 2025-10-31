import React from 'react';

const OpportunityForm = ({ formData = {}, setFormData = () => {}, onSubmit = () => {}, onCancel = () => {}, isExtended }) => (
  <div className="card p-4">
    <div className="grid grid-cols-1 gap-3">
      <input className="form-input" placeholder="Opportunity name" value={formData.opportunity_name || ''} onChange={(e) => setFormData({...formData, opportunity_name: e.target.value})} />
      {/* Add additional fields as needed */}
      <div className="flex gap-2">
        <button onClick={onSubmit} className="btn-primary">Save</button>
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
);

export default OpportunityForm;

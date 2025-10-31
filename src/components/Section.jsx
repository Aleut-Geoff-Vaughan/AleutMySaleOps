import React from 'react';

const Section = ({ title, sectionKey, children, expandedSections = {}, toggleSection = () => {} }) => (
  <div className="card mb-4">
    <div className="card-header flex items-center justify-between">
      <div>
        <h3 className="text-md font-semibold text-slate-900">{title}</h3>
      </div>
      <div>
        <button type="button" onClick={() => toggleSection(sectionKey)} className="text-slate-500 hover:text-slate-700">{expandedSections[sectionKey] ? '▾' : '▸'}</button>
      </div>
    </div>
    {expandedSections[sectionKey] && <div className="p-4 space-y-4">{children}</div>}
  </div>
);

export default Section;

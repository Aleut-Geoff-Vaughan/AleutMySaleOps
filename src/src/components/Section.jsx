import React from 'react';

const Section = ({ title, sectionKey, children, expandedSections = {}, toggleSection = () => {} }) => (
  <div className="border border-gray-200 rounded-lg mb-4">
    <button
      type="button"
      onClick={() => toggleSection(sectionKey)}
      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
    >
      <h3 className="text-md font-semibold text-gray-900">{title}</h3>
      <span className="text-gray-500">{expandedSections[sectionKey] ? '▾' : '▸'}</span>
    </button>
    {expandedSections[sectionKey] && <div className="p-4 space-y-4">{children}</div>}
  </div>
);

export default Section;

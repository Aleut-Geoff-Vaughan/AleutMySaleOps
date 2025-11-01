// Initial data for the application

export const initialUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', firstName: 'Admin', lastName: 'User', isActive: true },
  { id: 2, username: 'sales', password: 'sales123', role: 'sales', firstName: 'Sales', lastName: 'Rep', isActive: true },
  { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer', firstName: 'View', lastName: 'Only', isActive: true }
];

export const initialStages = [
  { id: 1, name: 'Prospecting', order: 1, isActive: true },
  { id: 2, name: 'Qualification', order: 2, isActive: true },
  { id: 3, name: 'Proposal', order: 3, isActive: true },
  { id: 4, name: 'Negotiation', order: 4, isActive: true },
  { id: 5, name: 'Closed Won', order: 5, isActive: true },
  { id: 6, name: 'Closed Lost', order: 6, isActive: true }
];

export const initialCapabilityGroups = [
  { id: 1, name: 'MSG', order: 1, isActive: true },
  { id: 2, name: 'TSG', order: 2, isActive: true }
];

export const initialCapabilities = [
  { id: 1, name: 'BOSS', groupId: 1, isActive: true },
  { id: 2, name: 'Cloud', groupId: 2, isActive: true },
  { id: 3, name: 'AI', groupId: 2, isActive: true },
  { id: 4, name: 'Development', groupId: 2, isActive: true }
];

export const initialAgencyTypes = [
  { id: 1, name: 'Federal', isActive: true },
  { id: 2, name: 'State', isActive: true },
  { id: 3, name: 'County', isActive: true },
  { id: 4, name: 'Municipal', isActive: true }
];

export const initialForecastGroups = [
  { id: 1, name: 'Division A', order: 1, isActive: true },
  { id: 2, name: 'Division B', order: 2, isActive: true },
  { id: 3, name: 'Federal', order: 3, isActive: true },
  { id: 4, name: 'State & Local', order: 4, isActive: true }
];

export const initialAgencies = [
  { id: 1, name: 'Department of Defense', city: 'Washington', state: 'DC', agencyType: 'Federal', phone: '703-571-3343', website: 'defense.gov', address: '1400 Defense Pentagon', zip: '20301' },
  { id: 2, name: 'Department of Homeland Security', city: 'Washington', state: 'DC', agencyType: 'Federal', phone: '202-282-8000', website: 'dhs.gov', address: '245 Murray Lane SW', zip: '20528' }
];

export const initialContacts = [
  { id: 1, agencyId: 1, firstName: 'John', lastName: 'Smith', title: 'Contracting Officer', email: 'john.smith@mail.mil', phone: '703-555-0100', mobile: '703-555-0101' },
  { id: 2, agencyId: 2, firstName: 'Sarah', lastName: 'Johnson', title: 'Procurement Specialist', email: 'sarah.johnson@hq.dhs.gov', phone: '202-555-0200', mobile: '202-555-0201' }
];

export const initialEntities = [
  {
    id: 1,
    name: 'TechSolutions LLC',
    ein: '12-3456789',
    formationDate: '2020-01-15',
    state: 'Delaware',
    sbaReportingDue: '2025-12-31',
    lastSbaReport: '2024-12-15',
    certifications: ['8(a)', 'SDVOSB'],
    documents: [
      { id: 1, name: 'Operating Agreement', url: 'https://example.com/doc1.pdf', uploadDate: '2024-01-10' },
      { id: 2, name: 'SBA Certification', url: 'https://example.com/doc2.pdf', uploadDate: '2024-02-15' }
    ],
    notes: 'Primary operating entity for federal contracts'
  },
  {
    id: 2,
    name: 'InnovateCorp LLC',
    ein: '98-7654321',
    formationDate: '2021-06-01',
    state: 'Virginia',
    sbaReportingDue: '2025-11-30',
    lastSbaReport: '2024-11-20',
    certifications: ['HUBZone'],
    documents: [],
    notes: 'Focused on state and local contracts'
  }
];

export const initialForecasts = [
  {
    id: 1,
    fiscalYear: 2025,
    groups: [
      { groupId: 1, target: 5000000, actual: 3200000, pipeline: 4500000 },
      { groupId: 2, target: 3000000, actual: 1800000, pipeline: 2800000 },
      { groupId: 3, target: 6000000, actual: 4100000, pipeline: 5200000 },
      { groupId: 4, target: 2000000, actual: 900000, pipeline: 1500000 }
    ],
    notes: 'FY2025 Annual Forecast',
    lastUpdated: '2024-10-15'
  }
];

export const initialPowerBIReports = [
  { id: 1, name: 'Sales Pipeline Analysis', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_1', description: 'Comprehensive pipeline analysis and forecasting' },
  { id: 2, name: 'Entity Performance', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_2', description: 'Performance metrics by entity and certification' },
  { id: 3, name: 'Win/Loss Analysis', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_3', description: 'Historical win rates and competitive analysis' }
];

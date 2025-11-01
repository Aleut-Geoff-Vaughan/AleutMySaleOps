import React, { createContext, useContext, useState, useMemo } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Configuration Data
  const [stages, setStages] = useState([
    { id: 1, name: 'Prospecting', order: 1, isActive: true },
    { id: 2, name: 'Qualification', order: 2, isActive: true },
    { id: 3, name: 'Proposal', order: 3, isActive: true },
    { id: 4, name: 'Negotiation', order: 4, isActive: true },
    { id: 5, name: 'Closed Won', order: 5, isActive: true },
    { id: 6, name: 'Closed Lost', order: 6, isActive: true }
  ]);

  const [capabilityGroups, setCapabilityGroups] = useState([
    { id: 1, name: 'MSG', order: 1, isActive: true },
    { id: 2, name: 'TSG', order: 2, isActive: true }
  ]);

  const [capabilities, setCapabilities] = useState([
    { id: 1, name: 'BOSS', groupId: 1, isActive: true },
    { id: 2, name: 'Cloud', groupId: 2, isActive: true },
    { id: 3, name: 'AI', groupId: 2, isActive: true },
    { id: 4, name: 'Development', groupId: 2, isActive: true }
  ]);

  const [agencyTypes, setAgencyTypes] = useState([
    { id: 1, name: 'Federal', isActive: true },
    { id: 2, name: 'State', isActive: true },
    { id: 3, name: 'County', isActive: true },
    { id: 4, name: 'Municipal', isActive: true }
  ]);

  const [forecastGroups, setForecastGroups] = useState([
    { id: 1, name: 'Division A', order: 1, isActive: true },
    { id: 2, name: 'Division B', order: 2, isActive: true },
    { id: 3, name: 'Federal', order: 3, isActive: true },
    { id: 4, name: 'State & Local', order: 4, isActive: true }
  ]);

  const [vehicleTypes, setVehicleTypes] = useState([
    { id: 1, name: 'GWAC', isActive: true },
    { id: 2, name: 'IDIQ', isActive: true },
    { id: 3, name: 'BPA', isActive: true },
    { id: 4, name: 'MATOC', isActive: true },
    { id: 5, name: 'SATOC', isActive: true },
    { id: 6, name: 'OTA', isActive: true },
    { id: 7, name: 'GSA Schedule', isActive: true },
    { id: 8, name: 'Other', isActive: true }
  ]);

  const [vehicleStatuses, setVehicleStatuses] = useState([
    { id: 1, name: 'Active', isActive: true },
    { id: 2, name: 'Pending', isActive: true },
    { id: 3, name: 'Expired', isActive: true },
    { id: 4, name: 'Inactive', isActive: true }
  ]);

  // Business Data
  const [agencies, setAgencies] = useState([
    { id: 1, name: 'Department of Defense', city: 'Washington', state: 'DC', agencyType: 'Federal', phone: '703-571-3343', website: 'defense.gov', address: '1400 Defense Pentagon', zip: '20301' },
    { id: 2, name: 'Department of Homeland Security', city: 'Washington', state: 'DC', agencyType: 'Federal', phone: '202-282-8000', website: 'dhs.gov', address: '245 Murray Lane SW', zip: '20528' }
  ]);

  const [contacts, setContacts] = useState([
    { id: 1, agencyId: 1, firstName: 'John', lastName: 'Smith', title: 'Contracting Officer', email: 'john.smith@mail.mil', phone: '703-555-0100', mobile: '703-555-0101' },
    { id: 2, agencyId: 2, firstName: 'Sarah', lastName: 'Johnson', title: 'Procurement Specialist', email: 'sarah.johnson@hq.dhs.gov', phone: '202-555-0200', mobile: '202-555-0201' }
  ]);

  const [opportunities, setOpportunities] = useState([
    {
      "id": 100,
      "opportunity_name": "CISA Planning Programming Budgeting and Execution Support",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 6,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2022-04-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": [],
      "contractVehicleId": null
    },
    {
      "id": 101,
      "opportunity_name": "USALearning? Education, Training Products, and Services",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 640000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2021-12-30",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 102,
      "opportunity_name": "USSPACECOM Additional Support for VTCs + Hours of Operations",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 153195,
      "stage": "Closed Won",
      "probability": 100,
      "close_date": "2021-02-26",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 103,
      "opportunity_name": "NORAD and USNORTHCOM Enterprise Information Services (EIS) Operation and Maintenance (OM) (N2ITSM)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 90000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2022-12-01",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 104,
      "opportunity_name": "FBI - DEVSECOPS - DigitalConsultants Team",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 10000000,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2022-08-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 105,
      "opportunity_name": "USAF - USAFA A&AS - CSSAR Extension",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 111765,
      "stage": "Closed Won",
      "probability": 100,
      "close_date": "2020-12-18",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 106,
      "opportunity_name": "USAF - USAFA A&AS - CyberWorx",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 694944,
      "stage": "Closed Won",
      "probability": 100,
      "close_date": "2021-06-14",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 107,
      "opportunity_name": "USAF - USAFA A&AS - Aero Combined",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 528755,
      "stage": "Closed Won",
      "probability": 100,
      "close_date": "2021-06-29",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 108,
      "opportunity_name": "USCG Search And Rescue Optimal Planning System (SAROPS) Task Order",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 500000,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2021-12-09",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 109,
      "opportunity_name": "GMD Additional Staff Schriever AFB in Colorado Springs and/or Ft. Greely, AK",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 250000,
      "stage": "Closed Lost",
      "probability": 10,
      "close_date": "2021-01-29",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 110,
      "opportunity_name": "Chief Information Officer?Solutions and Partners 4 (CIO-SP4)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2022-11-03",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 111,
      "opportunity_name": "ITES-4 (Services)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-06-03",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 112,
      "opportunity_name": "Responsive Strategic Sourcing for Services (RS4)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2025-03-31",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 113,
      "opportunity_name": "Polaris Small Business GWAC",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2022-08-03",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 114,
      "opportunity_name": "SPACEFORCE > GPS Interference Detection",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 15000,
      "stage": "Closed Won",
      "probability": 100,
      "close_date": "2021-01-22",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 115,
      "opportunity_name": "Perimeter Acquisition Radar Attack Characterizations System (PARCS)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 52000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-01-01",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 116,
      "opportunity_name": "A2/6 Consolidated Cyber Advisory and Assistance Services (A&AS)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 13000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-06-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 117,
      "opportunity_name": "24: SIPRNet and Global Command and Control System Administration (GCCS) support services",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 23000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2024-11-01",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 118,
      "opportunity_name": "USAFA Creative Services",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 5000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-03-31",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 119,
      "opportunity_name": "Space Operations System Engineering Technical Assistance",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 11000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-01-01",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 120,
      "opportunity_name": "Consolidated Air Force Satellite Control Network (AFSCN) Modifications, Maintenance & Ops (CAMMO) (STORMS)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 100000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-10-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 121,
      "opportunity_name": "National Air and Space Intelligence Center (NASIC) Advisory and Assistance Services III (A&ASIII) GS Task Order 1",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 80000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-10-02",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 122,
      "opportunity_name": "Encore IV",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-01-01",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 123,
      "opportunity_name": "DISA  Systems Engineering, Technology, and Innovation (SETI)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2024-03-03",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 124,
      "opportunity_name": "AS: DoS Support Services Acquisition Center",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 10000000,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2023-02-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 125,
      "opportunity_name": "24: Federal Protective Services Training Support",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 3000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2024-04-01",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 126,
      "opportunity_name": "24: Air Advisor Support",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 12000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2024-04-01",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 127,
      "opportunity_name": "23: Polar Security Cutter System Engineering Technical Assistance Support for the  Asset Project Office (SETA APO)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-05-01",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 128,
      "opportunity_name": "23: MODELING AND SIMULATION SOFTWARE DEVELOPMENT OPERATION AND SUSTAINMENT (M&S)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 24000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-08-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 129,
      "opportunity_name": "24: Accounting and Administrative Support Services at the Aviation Logistics Center",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 4000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2024-04-01",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 130,
      "opportunity_name": "23: Operations and Maintenance of Configuration and Maintenance Management System - Asset Computerized Maintenance Syste",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 15000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-09-01",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 131,
      "opportunity_name": "HQ AF Space Command Product Development Support for the Ready Spacecrew Program and Space Mission Force (RSP)(SMF)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 12000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2024-01-01",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 132,
      "opportunity_name": "CIO ISR ADVISORY AND ASSISTANCE SERVICES",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 3000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-06-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 133,
      "opportunity_name": "National Continuity Program Communications Division Engineering and Technical Support",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 2000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-07-03",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 134,
      "opportunity_name": "23: 18th Air Force Program Management Support",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 4000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-09-01",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 135,
      "opportunity_name": "HR Contact Center Modernization",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 500000,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2022-10-02",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 136,
      "opportunity_name": "Enterprise Cyber Capabilities (EC2)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-01-01",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 137,
      "opportunity_name": "USDA FPAC - Farmers.Gov O&M Support - Base",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 2349465,
      "stage": "Closed Won",
      "probability": 100,
      "close_date": "2022-06-27",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 138,
      "opportunity_name": "Technical Services Support (TSS) 2 Contract for  MyNavyHR Enterprise",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 20000000,
      "stage": "Closed Lost",
      "probability": 75,
      "close_date": "2022-11-01",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 139,
      "opportunity_name": "Consolidated Operations, Management, Engineering, and Test (COMET)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 5000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-11-03",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 140,
      "opportunity_name": "Mission Partner Environment Consolidation (MPC2 &I2S)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1000000,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2024-07-22",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 141,
      "opportunity_name": "Information Technology (IT) Support Service (ITSS) for the Office of Naval Research",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2026-12-01",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 142,
      "opportunity_name": "USAF NSSI - Sigmatech - BASE",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 171635,
      "stage": "Closed Won",
      "probability": 100,
      "close_date": "2021-05-01",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": []
    },
    {
      "id": 143,
      "opportunity_name": "Air Force DCGS Requirements Support Services (ADReSS)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 10000000,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2024-11-01",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 144,
      "opportunity_name": "GSA Federal Acquisition Service?s (FAS) Best-in-Class Multiple Agency Contract (BIC MAC) Services IDIQ",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2023-03-23",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 145,
      "opportunity_name": "DIA Jupiter Station Rapid Prototyping Project and Mission Support",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 3000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-03-17",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    },
    {
      "id": 146,
      "opportunity_name": "One Acquisition Solution for Integrated Services (OASIS+) 8(a)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Prospecting",
      "probability": 90,
      "close_date": "2025-11-03",
      "entityId": 1,
      "forecastGroupId": 3,
      "capabilities": [],
      "contractVehicleId": 1
    },
    {
      "id": 147,
      "opportunity_name": "Small Business Enterprise Applications Solutions IDIQ (SBEAS)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 1,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-06-01",
      "entityId": 1,
      "forecastGroupId": 4,
      "capabilities": []
    },
    {
      "id": 148,
      "opportunity_name": "Implementation Services for the National Correspondence Management System (NCMS)",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 25000000,
      "stage": "Closed Lost",
      "probability": 0,
      "close_date": "2023-01-22",
      "entityId": 1,
      "forecastGroupId": 1,
      "capabilities": []
    },
    {
      "id": 149,
      "opportunity_name": "OneRD Guaranteed Loan Program",
      "agency_id": 1,
      "primary_contact_id": 1,
      "value": 2000000,
      "stage": "Prospecting",
      "probability": 0,
      "close_date": "2022-10-03",
      "entityId": 1,
      "forecastGroupId": 2,
      "capabilities": []
    }
  ]);

  const [entities, setEntities] = useState([
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
  ]);

  const [forecasts, setForecasts] = useState([
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
  ]);

  const [contractVehicles, setContractVehicles] = useState([
    {
      id: 1,
      name: 'OASIS+ 8(a)',
      vehicleType: 'GWAC',
      govwinId: 'OASIS-8A-2025',
      description: 'One Acquisition Solution for Integrated Services Plus - 8(a) Small Business',
      agency_id: 1,
      owner: 'GSA',
      status: 'Active',
      startDate: '2024-01-15',
      expirationDate: '2029-01-14',
      ceilingValue: 15000000000,
      minOrderValue: 3500,
      maxOrderValue: 5000000,
      setAsideType: '8(a)',
      contacts: [],
      documents: [],
      notes: 'Primary GWAC for federal IT services'
    },
    {
      id: 2,
      name: 'GSA IT Schedule 70',
      vehicleType: 'GSA Schedule',
      govwinId: 'GSA-IT70-2023',
      description: 'General Services Administration IT Schedule 70',
      agency_id: 1,
      owner: 'GSA',
      status: 'Active',
      startDate: '2023-06-01',
      expirationDate: '2028-05-31',
      ceilingValue: null,
      minOrderValue: 2500,
      maxOrderValue: null,
      setAsideType: 'Small Business',
      contacts: [],
      documents: [],
      notes: 'GSA Schedule for IT products and services'
    }
  ]);

  const [powerBIReports] = useState([
    { id: 1, name: 'Sales Pipeline Analysis', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_1', description: 'Comprehensive pipeline analysis and forecasting' },
    { id: 2, name: 'Entity Performance', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_2', description: 'Performance metrics by entity and certification' },
    { id: 3, name: 'Win/Loss Analysis', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_3', description: 'Historical win rates and competitive analysis' }
  ]);

  // Memoized computed values
  const activeStages = useMemo(() => stages.filter(s => s.isActive), [stages]);
  const activeCapabilities = useMemo(() => capabilities.filter(c => c.isActive), [capabilities]);
  const activeAgencyTypes = useMemo(() => agencyTypes.filter(a => a.isActive), [agencyTypes]);
  const activeForecastGroups = useMemo(() => forecastGroups.filter(f => f.isActive), [forecastGroups]);
  const activeVehicleTypes = useMemo(() => vehicleTypes.filter(v => v.isActive), [vehicleTypes]);
  const activeVehicleStatuses = useMemo(() => vehicleStatuses.filter(v => v.isActive), [vehicleStatuses]);

  const value = {
    // Configuration
    stages,
    setStages,
    capabilityGroups,
    setCapabilityGroups,
    capabilities,
    setCapabilities,
    agencyTypes,
    setAgencyTypes,
    forecastGroups,
    setForecastGroups,
    vehicleTypes,
    setVehicleTypes,
    vehicleStatuses,
    setVehicleStatuses,

    // Business Data
    agencies,
    setAgencies,
    contacts,
    setContacts,
    opportunities,
    setOpportunities,
    entities,
    setEntities,
    forecasts,
    setForecasts,
    contractVehicles,
    setContractVehicles,
    powerBIReports,

    // Computed
    activeStages,
    activeCapabilities,
    activeAgencyTypes,
    activeForecastGroups,
    activeVehicleTypes,
    activeVehicleStatuses
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

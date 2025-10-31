import React, { useState } from 'react';
import { AlertCircle, Plus, Edit2, Trash2, ChevronRight, ChevronDown, FileText, BarChart3, ExternalLink, Upload, Calendar } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Section from './components/Section';

const MySalesOps = () => {
  // Users
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', firstName: 'Admin', lastName: 'User', isActive: true },
    { id: 2, username: 'sales', password: 'sales123', role: 'sales', firstName: 'Sales', lastName: 'Rep', isActive: true },
    { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer', firstName: 'View', lastName: 'Only', isActive: true }
  ]);
  
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // UI
  const [activeView, setActiveView] = useState('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [expandedSections, setExpandedSections] = useState({ basic: true });
  const [formType, setFormType] = useState('opportunity');
  const [isExtendedForm, setIsExtendedForm] = useState(false);
  
  // Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [sortBy, setSortBy] = useState('opportunity_name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Configuration
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

  // NEW: Forecast Groups Configuration
  const [forecastGroups, setForecastGroups] = useState([
    { id: 1, name: 'Division A', order: 1, isActive: true },
    { id: 2, name: 'Division B', order: 2, isActive: true },
    { id: 3, name: 'Federal', order: 3, isActive: true },
    { id: 4, name: 'State & Local', order: 4, isActive: true }
  ]);

  // Data
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
      id: 100,
      opportunity_name: "CISA Planning Programming Budgeting and Execution Support",
      agency_id: 1,
      primary_contact_id: 1,
      value: 6,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2022-04-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Business Line Priority",
      description: "OASIS TO: The Department of Homeland Security, Cybersecurity and Infrastructure Agency has a requirement for planning, programming, budgeting and execution support.  This will be issued via OASIS.",
      total_contract_value: 6,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2022-04-01",
      planned_rfp_release_date: "2021-03-01",
      planned_proposal_submission_date: "2022-03-11",
      contract_type: "TBD",
      solicitation_number: "F20210553648",
      acquisition_type: "TBD",
      duration: 51,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541611 Admin. Management & General Management Consulting Services ($16.5M)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/207325",
      govwin_id: "207325",
      notes: ""
    },
    {
      id: 101,
      opportunity_name: "USALearning? Education, Training Products, and Services",
      agency_id: 1,
      primary_contact_id: 1,
      value: 640000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2021-12-30",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Pre-Solicitation Notice Issued",
      priority: "Standard Priority",
      description: "OPM requires a contractor to provide integrated support of the Government's premier e-Learning provider and e-Training Program in the USALearning® program office. The contractor must be capable of providing various customized and configurable eLearning products and services to support multiple clients simultaneously. The provider must be agnostic to brand and specific systems and provide requirements-driven fully integrated learning ecosystem solutions to meet customer goals. These services shall include, but are not limited to the following:  Learning and Talent Management Systems (LMS) Learning Performance Systems Learner driven interfaces and portals support Learning development support for all types of learning environments, including structured (formal) or unstructured (informal) learning Learning Content Management Systems (LCMS) Course Development, Content Library provider, and SME curriculum development and delivery support Hosting Help Desk Services Online Forums (COPs, DM, KM, Social Media) Technical Support and Project Management Technical Training Assessments Organizational Needs Assessment Learning Records Data Warehouse",
      total_contract_value: 640000000,
      expected_revenue: 0,
      p_go: 25,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2022-04-01",
      planned_rfp_release_date: "2021-10-01",
      planned_proposal_submission_date: "",
      contract_type: "Firm Fixed Price (FFP)",
      solicitation_number: "",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541512 Computer Systems Design Services ($30M)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/143625",
      govwin_id: "143625",
      notes: ""
    },
    {
      id: 102,
      opportunity_name: "USSPACECOM Additional Support for VTCs + Hours of Operations",
      agency_id: 1,
      primary_contact_id: 1,
      value: 153195,
      stage: "Closed Won",
      probability: 100,
      close_date: "2021-02-26",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "(Submitted) Best and Final Offer",
      priority: "Business Line Priority",
      description: "TO Scope true up",
      total_contract_value: 153195,
      expected_revenue: 153195,
      p_go: 75,
      forecast_category: "Closed",
      included_in_forecast: false,
      project_start_date: "2021-03-05",
      planned_rfp_release_date: "",
      planned_proposal_submission_date: "",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "TBD",
      duration: 3,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 103,
      opportunity_name: "NORAD and USNORTHCOM Enterprise Information Services (EIS) Operation and Maintenance (OM) (N2ITSM)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 90000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2022-12-01",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "IT Service Management - including the N-NC Service Catalog and those services that depend on these services for infrastructure, transport, and access. Data Centers, support for the NIPRNet and SIPRNet and CENTRIXS, and commercially provisioned unclassified networks, and Training",
      total_contract_value: 90000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-01-01",
      planned_rfp_release_date: "2022-11-01",
      planned_proposal_submission_date: "2022-11-30",
      contract_type: "Single Award IDIQ / SATOC",
      solicitation_number: "",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "Other (please include in notes)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/99764",
      govwin_id: "99764",
      notes: ""
    },
    {
      id: 104,
      opportunity_name: "FBI - DEVSECOPS - DigitalConsultants Team",
      agency_id: 1,
      primary_contact_id: 1,
      value: 10000000,
      stage: "Prospecting",
      probability: 0,
      close_date: "2022-08-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Capture Planning",
      priority: "Standard Priority",
      description: "DevSecOps support to FBI",
      total_contract_value: 10000000,
      expected_revenue: 0,
      p_go: 50,
      forecast_category: "Omitted",
      included_in_forecast: true,
      project_start_date: "2022-09-03",
      planned_rfp_release_date: "2022-05-27",
      planned_proposal_submission_date: "2022-06-30",
      contract_type: "TBD",
      solicitation_number: "LSU RFI 110620",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 105,
      opportunity_name: "USAF - USAFA A&AS - CSSAR Extension",
      agency_id: 1,
      primary_contact_id: 1,
      value: 111765,
      stage: "Closed Won",
      probability: 100,
      close_date: "2020-12-18",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Active",
      priority: "Standard Priority",
      description: "",
      total_contract_value: 111765,
      expected_revenue: 111765,
      p_go: 50,
      forecast_category: "Closed",
      included_in_forecast: false,
      project_start_date: "2020-12-18",
      planned_rfp_release_date: "",
      planned_proposal_submission_date: "",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 12,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 106,
      opportunity_name: "USAF - USAFA A&AS - CyberWorx",
      agency_id: 1,
      primary_contact_id: 1,
      value: 694944,
      stage: "Closed Won",
      probability: 100,
      close_date: "2021-06-14",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "(Submitted) Best and Final Offer",
      priority: "Standard Priority",
      description: "",
      total_contract_value: 694944,
      expected_revenue: 694944,
      p_go: 50,
      forecast_category: "Closed",
      included_in_forecast: false,
      project_start_date: "2020-12-18",
      planned_rfp_release_date: "",
      planned_proposal_submission_date: "",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 12,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 107,
      opportunity_name: "USAF - USAFA A&AS - Aero Combined",
      agency_id: 1,
      primary_contact_id: 1,
      value: 528755,
      stage: "Closed Won",
      probability: 100,
      close_date: "2021-06-29",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Final RFP Issued",
      priority: "Standard Priority",
      description: "",
      total_contract_value: 528755,
      expected_revenue: 528755,
      p_go: 50,
      forecast_category: "Closed",
      included_in_forecast: false,
      project_start_date: "2020-12-18",
      planned_rfp_release_date: "",
      planned_proposal_submission_date: "",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 12,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 108,
      opportunity_name: "USCG Search And Rescue Optimal Planning System (SAROPS) Task Order",
      agency_id: 1,
      primary_contact_id: 1,
      value: 500000,
      stage: "Prospecting",
      probability: 0,
      close_date: "2021-12-09",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "",
      total_contract_value: 500000,
      expected_revenue: 0,
      p_go: 40,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2021-09-03",
      planned_rfp_release_date: "2020-10-02",
      planned_proposal_submission_date: "2022-05-02",
      contract_type: "Firm Fixed Price (FFP)",
      solicitation_number: "70Z04421R21000200",
      acquisition_type: "Unrestricted",
      duration: 12,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541512 Computer Systems Design Services ($30M)",
      opportunity_link: "https://beta.sam.gov/opp/2a7108f4e85545dc84a937c71a550857/view",
      govwin_id: "137180",
      notes: ""
    },
    {
      id: 109,
      opportunity_name: "GMD Additional Staff Schriever AFB in Colorado Springs and/or Ft. Greely, AK",
      agency_id: 1,
      primary_contact_id: 1,
      value: 250000,
      stage: "Closed Lost",
      probability: 10,
      close_date: "2021-01-29",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Active",
      priority: "Business Line Priority",
      description: "GMD Additional Staff Schriever AFB in Colorado Springs and/or Ft. Greely, AK",
      total_contract_value: 250000,
      expected_revenue: 25000,
      p_go: 100,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2021-02-01",
      planned_rfp_release_date: "2020-11-20",
      planned_proposal_submission_date: "2020-12-10",
      contract_type: "Firm Fixed Price (FFP)",
      solicitation_number: "",
      acquisition_type: "Unrestricted",
      duration: 12,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 110,
      opportunity_name: "Chief Information Officer?Solutions and Partners 4 (CIO-SP4)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2022-11-03",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Draft RFP Issued (or in full Capture)",
      priority: "Business Line Priority",
      description: "The Chief Information Officer?Solutions and Partners 4 (CIO-SP4) Government-Wide Acquisition Contract (GWAC) is a five-year Indefinite Delivery/Indefinite Quantity (IDIQ) contract with a five-year optional period; with a fifteen-year period of performance. Task Orders awarded on the last day of the GWAC ordering period in the five-year option can perform for up to five years. Therefore, the period of performance for the GWAC is 15 years. This contract is intended to provide Information Technology (IT) solutions and services as defined in FAR 2.101(b) and further clarified in the Clinger-Cohen Act of 1996. These IT solutions and services include, but are not limited to, health and  biomedical-related IT services to meet scientific, health, administrative,  operational, managerial and information management requirements. The contract also contains general IT services partly because medical systems are increasingly integrated within a broader IT architecture, requiring a systems approach to their implementation and a sound infrastructure for their operation.",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 70,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2022-12-01",
      planned_rfp_release_date: "2021-04-29",
      planned_proposal_submission_date: "2022-02-11",
      contract_type: "Hybrid",
      solicitation_number: "75N98120R00002",
      acquisition_type: "8(a)",
      duration: 120,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541990 All Other Professional, Scientific& Technical Services ($16.5M)",
      opportunity_link: "",
      govwin_id: "177161",
      notes: ""
    },
    {
      id: 111,
      opportunity_name: "ITES-4 (Services)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-06-03",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "ITES-4 Information Technology Enterprise Support",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 5,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-07-31",
      planned_rfp_release_date: "2022-12-01",
      planned_proposal_submission_date: "2022-12-30",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Unrestricted",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/64990",
      govwin_id: "",
      notes: ""
    },
    {
      id: 112,
      opportunity_name: "Responsive Strategic Sourcing for Services (RS4)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2025-03-31",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "Responsive Strategic Sourcing for Services",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-12-29",
      planned_rfp_release_date: "2023-03-01",
      planned_proposal_submission_date: "2023-03-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 113,
      opportunity_name: "Polaris Small Business GWAC",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2022-08-03",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Draft RFP Issued (or in full Capture)",
      priority: "Standard Priority",
      description: "Polaris is a family of Multiple Award, IDIQ contracts to provide customized IT services and IT service-based solutions and IT services-based solutions. The principal nature of any resulting task order procurement must be for IT services; however, ancillary support may be included when it is integral to and necessary for the IT services-based effort.",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2022-11-01",
      planned_rfp_release_date: "2022-03-25",
      planned_proposal_submission_date: "2022-05-13",
      contract_type: "TBD",
      solicitation_number: "47QTCB22R0001",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541512 Computer Systems Design Services ($30M)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/214987",
      govwin_id: "214987",
      notes: ""
    },
    {
      id: 114,
      opportunity_name: "SPACEFORCE > GPS Interference Detection",
      agency_id: 1,
      primary_contact_id: 1,
      value: 15000,
      stage: "Closed Won",
      probability: 100,
      close_date: "2021-01-22",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Proposal Submitted",
      priority: "Standard Priority",
      description: "Provide engineering options regarding interference effecting the operations of the GPS antenna in Building 400 on Schriever AFB, CO. The ultimate goal is to identify possible sources causing the interference and provide recommendation, as applicable, for remediation of the cause.",
      total_contract_value: 15000,
      expected_revenue: 15000,
      p_go: 80,
      forecast_category: "Closed",
      included_in_forecast: false,
      project_start_date: "2021-03-31",
      planned_rfp_release_date: "2020-12-31",
      planned_proposal_submission_date: "2021-01-07",
      contract_type: "Firm Fixed Price (FFP)",
      solicitation_number: "",
      acquisition_type: "Unrestricted",
      duration: 4,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 115,
      opportunity_name: "Perimeter Acquisition Radar Attack Characterizations System (PARCS)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 52000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-01-01",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Capture Planning",
      priority: "Standard Priority",
      description: "The Perimeter Acquisition Radar Attack Characterization System (PARCS) is a single-faced, multi-function, UHF-Band, phased-array radar located at Cavalier Air Force Station, N.D.   The primary mission of PARCS is to keep watch for sea-launched and intercontinental ballistic missiles launched toward North America, and to collect Launch and Predicted Impact (L&PI) data, generally defined as missile warning (MW) data. The secondary mission of PARCS is to provide data concerning space launches and orbiting objects as a collateral sensor for the Space Surveillance Network (SSN).",
      total_contract_value: 52000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-02-02",
      planned_rfp_release_date: "2022-01-07",
      planned_proposal_submission_date: "2022-02-28",
      contract_type: "TBD",
      solicitation_number: "FA2517PARCS2023",
      acquisition_type: "Unrestricted",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/172534?sm=OTk1OWEzMWMtMzIxYi00ZWNhLTgwMTUtNjRiM2QwODI1OTk3",
      govwin_id: "172534",
      notes: ""
    },
    {
      id: 116,
      opportunity_name: "A2/6 Consolidated Cyber Advisory and Assistance Services (A&AS)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 13000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-06-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "(Submitted) Market Research/Sources Sought",
      priority: "Standard Priority",
      description: "OASIS TO: A&AS for Intelligence, Surveillance, and Reconnaissance (ISR) Chief Information Officer (CIO) Support Services. Support with AF A2/6 MAJCOM/A2s and subordinate units for ongoing and emerging core components of the information architecture capability system that exits today in support of the warfighter needs in the AOR for timely fused intelligence information. Provides multi-layer analysis to address rapid tactical missions.",
      total_contract_value: 13000000,
      expected_revenue: 0,
      p_go: 20,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-06-01",
      planned_rfp_release_date: "2022-11-01",
      planned_proposal_submission_date: "2022-11-28",
      contract_type: "Hybrid",
      solicitation_number: "",
      acquisition_type: "Unrestricted",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "205085",
      notes: ""
    },
    {
      id: 117,
      opportunity_name: "24: SIPRNet and Global Command and Control System Administration (GCCS) support services",
      agency_id: 1,
      primary_contact_id: 1,
      value: 23000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2024-11-01",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "Provide technical solutions and cost estimate for the installation of SIPRNET projects; expansion of existing VoSIP network infrastructure (Call Manager) and secure room requirements for classified network equipment. Provide SIPRNET systems support relating to the day-to-day operations of fiberbased and copper-based infrastructure. Support analysis of network performance (i.e. traffic load, connect time, transmission speeds, packet sizes, and throughput. Support site surveys, development of network designs, support troubleshooting, configuration control, and testing. Train military counterparts in both network management and configuration management. Support preparation and maintenance of local accreditation packages for SIPRNET and VoSIP architecture.",
      total_contract_value: 23000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2025-11-01",
      planned_rfp_release_date: "2024-05-01",
      planned_proposal_submission_date: "2024-05-28",
      contract_type: "Hybrid",
      solicitation_number: "FA521520R7004",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/186038",
      govwin_id: "186038",
      notes: ""
    },
    {
      id: 118,
      opportunity_name: "USAFA Creative Services",
      agency_id: 1,
      primary_contact_id: 1,
      value: 5000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-03-31",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "The Department of the Air Force, U.S. Air Force Academy, Communications and Outreach Directorate, Public Affairs Office may have a continuing requirement for videography, photography, and graphic design services.",
      total_contract_value: 5000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-03-31",
      planned_rfp_release_date: "2023-02-01",
      planned_proposal_submission_date: "2023-03-01",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/192124",
      govwin_id: "192124",
      notes: ""
    },
    {
      id: 119,
      opportunity_name: "Space Operations System Engineering Technical Assistance",
      agency_id: 1,
      primary_contact_id: 1,
      value: 11000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-01-01",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS: The Department of the Air Force, Office of the Chief of Staff of the Air Force (CSAF), Space Operations Directorate's (HAF/A11) may have a continuing requirement for System Engineering Technical Assistance support.  TO OASIS SB, only one offer submitted, follow-on will be procured in the same manner.",
      total_contract_value: 11000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-01-01",
      planned_rfp_release_date: "2022-11-01",
      planned_proposal_submission_date: "2022-11-30",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/192045",
      govwin_id: "192045",
      notes: ""
    },
    {
      id: 120,
      opportunity_name: "Consolidated Air Force Satellite Control Network (AFSCN) Modifications, Maintenance & Ops (CAMMO) (STORMS)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 100000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-10-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "The Department of the Air Force, Air Force Space Command, Space and Missiles Systems Center, Range and Network Systems Division may have a continuing requirement for a Consolidated Air Force Satellite Control Network (AFSCN) Modifications, Maintenance & Operations (CAMMO) contract.",
      total_contract_value: 100000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-11-01",
      planned_rfp_release_date: "2023-05-01",
      planned_proposal_submission_date: "2023-05-30",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Unrestricted",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/178448",
      govwin_id: "178448",
      notes: ""
    },
    {
      id: 121,
      opportunity_name: "National Air and Space Intelligence Center (NASIC) Advisory and Assistance Services III (A&ASIII) GS Task Order 1",
      agency_id: 1,
      primary_contact_id: 1,
      value: 80000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-10-02",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "BPA: The Department of the Air Force, National Air and Space Intelligence Center (NASIC), Geospatial and Signatures Intelligence Group (GS) has a follow-on requirement for Measurement and Signature Intelligence Geospatial and Intelligence advisory and assistance services.",
      total_contract_value: 80000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-11-02",
      planned_rfp_release_date: "2023-03-01",
      planned_proposal_submission_date: "2023-03-30",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/199077",
      govwin_id: "199077",
      notes: ""
    },
    {
      id: 122,
      opportunity_name: "Encore IV",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-01-01",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "Follow on Encore contract with DISA",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-01-01",
      planned_rfp_release_date: "2023-01-01",
      planned_proposal_submission_date: "2023-11-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 123,
      opportunity_name: "DISA  Systems Engineering, Technology, and Innovation (SETI)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2024-03-03",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "SETI is a new multiple-award task order contract (MATOC) vehicle for the Department of Defense. It is based on innovation as a priority to solve the complex IT engineering and developmental requirements for DISA and its mission partners. SETI will consolidate and streamline critical engineering expertise to research, design, develop, implement, integrate, and optimize DOD IT capabilities, systems, and solutions.",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2025-01-01",
      planned_rfp_release_date: "2024-01-01",
      planned_proposal_submission_date: "2024-02-01",
      contract_type: "Multi Award IDIQ / MATOC",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 124,
      opportunity_name: "AS: DoS Support Services Acquisition Center",
      agency_id: 1,
      primary_contact_id: 1,
      value: 10000000,
      stage: "Prospecting",
      probability: 0,
      close_date: "2023-02-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Capture Planning",
      priority: "Standard Priority",
      description: "Team with Metrostar for DoS Acquisition Center software development opportunity (60 People)",
      total_contract_value: 10000000,
      expected_revenue: 0,
      p_go: 20,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-03-01",
      planned_rfp_release_date: "2023-01-01",
      planned_proposal_submission_date: "2023-01-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "TBD",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 125,
      opportunity_name: "24: Federal Protective Services Training Support",
      agency_id: 1,
      primary_contact_id: 1,
      value: 3000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2024-04-01",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Initial Capture Planning",
      priority: "Standard Priority",
      description: "The Department of Homeland Security (DHS), Federal Protective Services (FPS) may have a continuing requirement for instructors to support the current full-time employee instructor staff in the Training and Professional Development division at the Federal Law Enforcement Training Centers in Glynco, GA.",
      total_contract_value: 3000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2024-01-29",
      planned_rfp_release_date: "2024-01-01",
      planned_proposal_submission_date: "2024-01-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Small Business",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/187945",
      govwin_id: "187945",
      notes: ""
    },
    {
      id: 126,
      opportunity_name: "24: Air Advisor Support",
      agency_id: 1,
      primary_contact_id: 1,
      value: 12000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2024-04-01",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS: Air Force, Office of the Chief of Staff of the Air Force, Directorate of Training and Readiness - Mobility A3TM may have a continuing requirement for Air Advisor support services.",
      total_contract_value: 12000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2024-01-01",
      planned_rfp_release_date: "2024-03-01",
      planned_proposal_submission_date: "2024-03-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/199626?sm=MTY3YWY4YWQtN2YwNi00ZDkzLWI0NjEtZWI1NDY2YmIxMzAx",
      govwin_id: "199626",
      notes: ""
    },
    {
      id: 127,
      opportunity_name: "23: Polar Security Cutter System Engineering Technical Assistance Support for the  Asset Project Office (SETA APO)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-05-01",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS: DHS, U.S. Coast Guard, Asset Project Office (APO) ongoing requirement for Integrated Logistics System Engineering Technical Assistance and Project Management for the Heavy Polar Icebreaker (HPIB) Program.",
      total_contract_value: 1000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-01-01",
      planned_rfp_release_date: "2023-02-01",
      planned_proposal_submission_date: "2023-02-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Unrestricted",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/196295",
      govwin_id: "196295",
      notes: ""
    },
    {
      id: 128,
      opportunity_name: "23: MODELING AND SIMULATION SOFTWARE DEVELOPMENT OPERATION AND SUSTAINMENT (M&S)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 24000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-08-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS: The Department of the Air Force, Air Force Materiel Command, Air Force Nuclear Weapons Center has a requirement for Modeling & Simulation Software Development, Operation and Sustainment.",
      total_contract_value: 24000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2024-01-01",
      planned_rfp_release_date: "2023-02-01",
      planned_proposal_submission_date: "2023-02-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/188930",
      govwin_id: "188930",
      notes: ""
    },
    {
      id: 129,
      opportunity_name: "24: Accounting and Administrative Support Services at the Aviation Logistics Center",
      agency_id: 1,
      primary_contact_id: 1,
      value: 4000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2024-04-01",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS SB: The Department of Homeland Security (DHS), US Coast Guard's, (USCG) may have a continuing requirement for accounting and administrative support services for the Aviation Logistics Center, in Elizabeth City, NC.",
      total_contract_value: 4000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2025-01-01",
      planned_rfp_release_date: "2024-02-01",
      planned_proposal_submission_date: "2024-02-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/197090",
      govwin_id: "197090",
      notes: ""
    },
    {
      id: 130,
      opportunity_name: "23: Operations and Maintenance of Configuration and Maintenance Management System - Asset Computerized Maintenance Syste",
      agency_id: 1,
      primary_contact_id: 1,
      value: 15000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-09-01",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "The Department of Homeland Security, United States Coast Guard, Coast Guard Engineering and Industrial Support Division may have an ongoing requirement for the operation and maintenance of its Configuration and Maintenance Management (CMM) system currently referred to as Asset Computerized Maintenance System (ACMS).",
      total_contract_value: 15000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2024-01-01",
      planned_rfp_release_date: "2023-03-01",
      planned_proposal_submission_date: "2023-03-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/185911",
      govwin_id: "185911",
      notes: ""
    },
    {
      id: 131,
      opportunity_name: "HQ AF Space Command Product Development Support for the Ready Spacecrew Program and Space Mission Force (RSP)(SMF)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 12000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2024-01-01",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS SB: The Department of the Air Force, Air Force Space Command (AFSPC), HQ AFSPC Integrated Air, Space, Cyberspace and ISR Operations Directorate may have a continuing requirement for training product development support.",
      total_contract_value: 12000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2024-02-01",
      planned_rfp_release_date: "2023-10-01",
      planned_proposal_submission_date: "2023-10-30",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "Small Business",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/185478?sm=MjlmOWI1Y2UtNDIwNy00ZGE5LWIxYTEtYjJkZjQzOTk4MDk4",
      govwin_id: "185478",
      notes: ""
    },
    {
      id: 132,
      opportunity_name: "CIO ISR ADVISORY AND ASSISTANCE SERVICES",
      agency_id: 1,
      primary_contact_id: 1,
      value: 3000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-06-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "The Department of the Air Force, Office of the Chief of Staff, ISR and Cyber Effects Operations (A2/A6) may have a continuing requirement for A&AS support.",
      total_contract_value: 3000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-01-01",
      planned_rfp_release_date: "2022-11-01",
      planned_proposal_submission_date: "2022-11-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/205085",
      govwin_id: "205085",
      notes: ""
    },
    {
      id: 133,
      opportunity_name: "National Continuity Program Communications Division Engineering and Technical Support",
      agency_id: 1,
      primary_contact_id: 1,
      value: 2000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-07-03",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS: The Department of Homeland Security, Federal Emergency Management Agency (FEMA) may have a continuing requirement for National Continuity Programs (NCP), Continuity Communications Division (CCD), Engineering and Technical Support Services.",
      total_contract_value: 2000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-01-01",
      planned_rfp_release_date: "2023-04-01",
      planned_proposal_submission_date: "2023-04-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/193869",
      govwin_id: "193869",
      notes: ""
    },
    {
      id: 134,
      opportunity_name: "23: 18th Air Force Program Management Support",
      agency_id: 1,
      primary_contact_id: 1,
      value: 4000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-09-01",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "OASIS SB Pool: The Department of the Air Force, Air Mobility Command, 18th Air Force, 375th Air Mobility Wing may have a continuing requirement for program management support.",
      total_contract_value: 4000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-01-01",
      planned_rfp_release_date: "2023-06-01",
      planned_proposal_submission_date: "2023-08-01",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/189303",
      govwin_id: "189303",
      notes: ""
    },
    {
      id: 135,
      opportunity_name: "HR Contact Center Modernization",
      agency_id: 1,
      primary_contact_id: 1,
      value: 500000,
      stage: "Prospecting",
      probability: 0,
      close_date: "2022-10-02",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "There is an ongoing effort to modernize their HR shared service center.",
      total_contract_value: 500000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2021-11-01",
      planned_rfp_release_date: "2022-09-01",
      planned_proposal_submission_date: "2022-09-30",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 136,
      opportunity_name: "Enterprise Cyber Capabilities (EC2)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-01-01",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Final RFP Issued",
      priority: "Standard Priority",
      description: "New requirement for The scope of this effort includes supporting and enabling activities such as cyber operations, command and control, cyber planning, cyber security, cyber analysis, full spectrum testing, TTP development, modeling and simulation, cyber mission essential support, threat assessment support, targeting and analysis support, real time operation and integration activities, software and tool development, vulnerability research, intrusion detection and prevention support, cyber qualification training, and strategic management support which enable fulfillment of the Air Force cyber mission.",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-02-01",
      planned_rfp_release_date: "2022-09-23",
      planned_proposal_submission_date: "2022-12-02",
      contract_type: "TBD",
      solicitation_number: "FA877322R0005",
      acquisition_type: "Small Business",
      duration: 120,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541330 Engineering Services ($16.5M)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/184301",
      govwin_id: "184301",
      notes: ""
    },
    {
      id: 137,
      opportunity_name: "USDA FPAC - Farmers.Gov O&M Support - Base",
      agency_id: 1,
      primary_contact_id: 1,
      value: 2349465,
      stage: "Closed Won",
      probability: 100,
      close_date: "2022-06-27",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Active",
      priority: "Business Line Priority",
      description: "3 Year Contract - Base + 2 - The USDA's Farm Production and Conservation (FPAC) mission area offers production and conservation tools, financial assistance, and technical advice along with commodity, lending, and disaster programs for America?s farmers, ranchers, and private forest landowners. With offices that serve customers in every state and county, FPAC agency employees deliver personalized customer service locally to producers, a service valued by producers and partners alike. Farmers.gov was developed in 2018 as an online platform to improve customer experience and access to FPAC programs. It enables customers to conduct business with the Department and learn about programs and services offered through a website that is user-focused and customer service driven.",
      total_contract_value: 2349465,
      expected_revenue: 2349465,
      p_go: 100,
      forecast_category: "Closed",
      included_in_forecast: true,
      project_start_date: "2022-06-30",
      planned_rfp_release_date: "2022-05-17",
      planned_proposal_submission_date: "2022-06-09",
      contract_type: "Firm Fixed Price (FFP)",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 12,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 138,
      opportunity_name: "Technical Services Support (TSS) 2 Contract for  MyNavyHR Enterprise",
      agency_id: 1,
      primary_contact_id: 1,
      value: 20000000,
      stage: "Closed Lost",
      probability: 75,
      close_date: "2022-11-01",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Draft RFP Issued (or in full Capture)",
      priority: "Standard Priority",
      description: "N1 requires technical support services for N16 CIO statutory oversight responsibilities, which includes IT Enterprise Architecture (EA), Portfolio Management (PfM), Governance Operations, and IM/IT Requirements Management.   \t The effort will encompass all aspects of N16 CIO and IM/IT Requirements at the Echelon I level, as well as at the Echelon II/III level at BUPERS/NPC, CNRC, and NETC. The support will require direct interaction with action officers and program managers across the MyNavyHR enterprise as well as all other Navy Enterprises and Enablers to support N1 IM/IT responsibilities.  In addition, support will require the analysis and refinement of legacy IS sustainment and the sustainment of the optimized IS construct.  Finally, the contractors will provide a continuum of on-site and off-site support to N1?s action officers, program managers and analysts at all echelon levels, for multiple commands, and at multiple geographic locations.",
      total_contract_value: 20000000,
      expected_revenue: 15000000,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2022-12-01",
      planned_rfp_release_date: "2022-06-01",
      planned_proposal_submission_date: "2022-06-11",
      contract_type: "TBD",
      solicitation_number: "N0018921RZ032",
      acquisition_type: "Unrestricted",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541512 Computer Systems Design Services ($30M)",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 139,
      opportunity_name: "Consolidated Operations, Management, Engineering, and Test (COMET)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 5000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-11-03",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Proposal Submitted",
      priority: "Standard Priority",
      description: "Manage and perform activities to accomplish ground processing for launch vehicles, spacecraft and payloads in support of the ISS, GSDO, SLS and MPCV Programs and LSP spacecraft customers. The contractor shall manage and perform Spaceport Services for existing and emerging programs, commercial entities and other government agencies as designated by the Government.",
      total_contract_value: 5000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-12-03",
      planned_rfp_release_date: "2022-02-16",
      planned_proposal_submission_date: "2022-04-25",
      contract_type: "TBD",
      solicitation_number: "80KSC022R0004",
      acquisition_type: "Unrestricted",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "Other (please include in notes)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/165798",
      govwin_id: "165798",
      notes: ""
    },
    {
      id: 140,
      opportunity_name: "Mission Partner Environment Consolidation (MPC2 &I2S)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1000000,
      stage: "Prospecting",
      probability: 0,
      close_date: "2024-07-22",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Pre-Solicitation Notice Issued",
      priority: "Standard Priority",
      description: "Team to support CACI",
      total_contract_value: 1000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2024-08-01",
      planned_rfp_release_date: "2024-06-06",
      planned_proposal_submission_date: "2024-06-28",
      contract_type: "TBD",
      solicitation_number: "CDM-2020-1",
      acquisition_type: "Unrestricted",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "541512 Computer Systems Design Services ($30M)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/188804",
      govwin_id: "188804",
      notes: ""
    },
    {
      id: 141,
      opportunity_name: "Information Technology (IT) Support Service (ITSS) for the Office of Naval Research",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2026-12-01",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "(Submitted) Market Research/Sources Sought",
      priority: "Standard Priority",
      description: "FedConnect: Request for Information for Information Technology (IT) Support Service for the Office of Naval Research",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2026-12-01",
      planned_rfp_release_date: "2026-12-01",
      planned_proposal_submission_date: "2026-12-01",
      contract_type: "TBD",
      solicitation_number: "N00014-21-R-0008",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 142,
      opportunity_name: "USAF NSSI - Sigmatech - BASE",
      agency_id: 1,
      primary_contact_id: 1,
      value: 171635,
      stage: "Closed Won",
      probability: 100,
      close_date: "2021-05-01",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "(Submitted) Best and Final Offer",
      priority: "Business Line Priority",
      description: "Recompete of existing work as a sub",
      total_contract_value: 171635,
      expected_revenue: 171635,
      p_go: 100,
      forecast_category: "Closed",
      included_in_forecast: true,
      project_start_date: "2021-05-01",
      planned_rfp_release_date: "",
      planned_proposal_submission_date: "",
      contract_type: "Time & Material (T&M)",
      solicitation_number: "",
      acquisition_type: "Unrestricted",
      duration: 12,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 143,
      opportunity_name: "Air Force DCGS Requirements Support Services (ADReSS)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 10000000,
      stage: "Prospecting",
      probability: 0,
      close_date: "2024-11-01",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Capture Planning",
      priority: "Standard Priority",
      description: "This Sources Sought Synopsis (SSS) is being conducted to identify potential sources that may possess the expertise, capabilities, and experience to meet the requirements to fulfill the capabilities and services identified below in support of the missions and operations carried out by Air Force Distributed Common Ground Systems (AF DCGS)",
      total_contract_value: 10000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: true,
      project_start_date: "2024-12-01",
      planned_rfp_release_date: "2024-10-01",
      planned_proposal_submission_date: "2024-10-28",
      contract_type: "TBD",
      solicitation_number: "FA8527-21-R-0013",
      acquisition_type: "TBD",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/202632",
      govwin_id: "202632",
      notes: ""
    },
    {
      id: 144,
      opportunity_name: "GSA Federal Acquisition Service?s (FAS) Best-in-Class Multiple Agency Contract (BIC MAC) Services IDIQ",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Prospecting",
      probability: 0,
      close_date: "2023-03-23",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "(Submitted) Market Research/Sources Sought",
      priority: "Standard Priority",
      description: "The U.S. General Services Administration (GSA) is developing a new indefinite-delivery indefinite-quantity (IDIQ) best-in-class (BIC) multi-agency contract (MAC) contract program to support federal agencies? procurement requirements for services. GSA?s goal is to establish a BIC MAC that is flexible, can evolve and expand over time, and supports a broad range of mission and service needs through a highly qualified industrial base. Led by the Federal Acquisition Service?s (FAS) Office of Professional Services and Human Capital Categories (PSHC) the contract program will be developed with collaborative engagement from federal ordering agencies, industry partners, multiple FAS programs and offices, the Small Business Administration, and other key stakeholders.",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-04-01",
      planned_rfp_release_date: "2023-01-23",
      planned_proposal_submission_date: "2023-02-23",
      contract_type: "Multi Award IDIQ / MATOC",
      solicitation_number: "47QRCA21N0001",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/201043",
      govwin_id: "201043",
      notes: ""
    },
    {
      id: 145,
      opportunity_name: "DIA Jupiter Station Rapid Prototyping Project and Mission Support",
      agency_id: 1,
      primary_contact_id: 1,
      value: 3000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-03-17",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Initial Capture Planning",
      priority: "Standard Priority",
      description: "eBuy OASIS Pool 3 8(a):To provide necessary contractor support required to advance the rapid prototyping mission of the Defense Intelligence Agency (DIA), Directorate for Science and Technology (ST), Office of Advanced Technologies Intelligence (ATI), Quick Reaction Development Division (ATI7) referred to as ?Jupiter Station? (JS).  The intent of this acquisition is to provide the necessary labor, purchasing abilities, and access to ancillary services so that ATI7 can meet the rapid research and development timelines levied upon them to meet real world mission and operational requirements.",
      total_contract_value: 3000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2022-04-30",
      planned_rfp_release_date: "2022-10-01",
      planned_proposal_submission_date: "2022-10-30",
      contract_type: "TBD",
      solicitation_number: "RFQ1481122",
      acquisition_type: "8(a)",
      duration: 36,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "",
      notes: ""
    },
    {
      id: 146,
      opportunity_name: "One Acquisition Solution for Integrated Services (OASIS+) 8(a)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Prospecting",
      probability: 90,
      close_date: "2025-11-03",
      entityId: 1,
      forecastGroupId: 3,
      capabilities: [],
      opportunity_status: "Final RFP Issued",
      priority: "Aleut Federal Priority",
      description: "OASIS Recompete and updated vehicle. This contract is planned to replace the One Acquisition Solution for Integrated Services (OASIS) acquisition vehicle and it will include functional areas from other GSA contracts such as BMO (Building Maintenance and Operation) and HCaTS (Human Capital Training Solution).",
      total_contract_value: 1,
      expected_revenue: 1,
      p_go: 20,
      forecast_category: "Forecast",
      included_in_forecast: false,
      project_start_date: "2025-11-03",
      planned_rfp_release_date: "2023-07-01",
      planned_proposal_submission_date: "2023-09-21",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/201043",
      govwin_id: "201043",
      notes: ""
    },
    {
      id: 147,
      opportunity_name: "Small Business Enterprise Applications Solutions IDIQ (SBEAS)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 1,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-06-01",
      entityId: 1,
      forecastGroupId: 4,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "The purpose of this Indefinite Delivery/Indefinite Quantity (IDIQ) Contract is to provide a vehicle for customers to access a wide range of Information Technology (IT) Network Centric services and solutions that support the IT lifecycle. While the SBEAS contract is mandatory use for the Air Force, this contract vehicle may be used by all other agencies that support an Air Force requirement.The purpose of this Indefinite Delivery/Indefinite Quantity (IDIQ) Contract is to provide a vehicle for customers to access a wide range of Information Technology (IT) Network Centric services and solutions that support the IT lifecycle. While the SBEAS contract is mandatory use for the Air Force, this contract vehicle may be used by all other agencies that support an Air Force requirement.",
      total_contract_value: 1,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-07-01",
      planned_rfp_release_date: "2023-04-01",
      planned_proposal_submission_date: "2023-04-28",
      contract_type: "TBD",
      solicitation_number: "",
      acquisition_type: "8(a)",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "",
      govwin_id: "146278",
      notes: ""
    },
    {
      id: 148,
      opportunity_name: "Implementation Services for the National Correspondence Management System (NCMS)",
      agency_id: 1,
      primary_contact_id: 1,
      value: 25000000,
      stage: "Closed Lost",
      probability: 0,
      close_date: "2023-01-22",
      entityId: 1,
      forecastGroupId: 1,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "The U.S. Department of Agriculture, Forest Service has a requirement for personnel, equipment, tools, materials, supervision, and other items and non-personal services necessary to perform National Correspondence Management System (NCMS) Implementation Service.",
      total_contract_value: 25000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2023-02-01",
      planned_rfp_release_date: "2022-09-01",
      planned_proposal_submission_date: "2022-09-30",
      contract_type: "TBD",
      solicitation_number: "12760420Q0185_1",
      acquisition_type: "8(a)",
      duration: 60,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "Other (please include in notes)",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/198098",
      govwin_id: "198098",
      notes: ""
    },
    {
      id: 149,
      opportunity_name: "OneRD Guaranteed Loan Program",
      agency_id: 1,
      primary_contact_id: 1,
      value: 2000000,
      stage: "Prospecting",
      probability: 0,
      close_date: "2022-10-03",
      entityId: 1,
      forecastGroupId: 2,
      capabilities: [],
      opportunity_status: "Initial Prospect/Forecast",
      priority: "Standard Priority",
      description: "The U.S. Department of Agriculture, Rural Development (USDA RD) has a requirement to develop an automated system to support application intake, review, processing, and loan guarantee issuing and servicing under the OneRD Guaranteed Loan Program Regulation. This regulation combines regulations previously governing four existing commercial loan guarantee programs.",
      total_contract_value: 2000000,
      expected_revenue: 0,
      p_go: 10,
      forecast_category: "Omitted",
      included_in_forecast: false,
      project_start_date: "2022-11-01",
      planned_rfp_release_date: "2022-09-03",
      planned_proposal_submission_date: "2022-09-30",
      contract_type: "TBD",
      solicitation_number: "USDARD070820",
      acquisition_type: "8(a)",
      duration: 48,
      budget_confirmed: false,
      discovery_completed: false,
      roi_analysis_completed: false,
      primary_business_line: "Technology Services",
      primary_naics_code: "TBD",
      opportunity_link: "https://iq.govwin.com/neo/opportunity/view/194874",
      govwin_id: "194874",
      notes: ""
    }
  ]);

  // NEW: Entities (LLCs)
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

  // NEW: Sales Targets & Forecasts
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

  // NEW: Power BI Reports
  const [powerBIReports] = useState([
    { id: 1, name: 'Sales Pipeline Analysis', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_1', description: 'Comprehensive pipeline analysis and forecasting' },
    { id: 2, name: 'Entity Performance', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_2', description: 'Performance metrics by entity and certification' },
    { id: 3, name: 'Win/Loss Analysis', embedUrl: 'https://app.powerbi.com/view?r=SAMPLE_REPORT_3', description: 'Historical win rates and competitive analysis' }
  ]);

  // Helpers
  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.isActive);
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setCurrentUser(`${user.firstName} ${user.lastName}`);
      setUserRole(user.role);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const getAgencyName = (id) => agencies.find(a => a.id === id)?.name || 'Unknown';
  const getContactName = (id) => {
    const contact = contacts.find(c => c.id === id);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
  };
  const getEntityName = (id) => entities.find(e => e.id === id)?.name || 'Unknown';
  const getForecastGroupName = (id) => forecastGroups.find(g => g.id === id)?.name || 'Unknown';
  const getAgencyContacts = (agencyId) => contacts.filter(c => c.agencyId === agencyId);

  const calculateStats = () => {
    const total = opportunities.reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    const weighted = opportunities.filter(opp => !opp.stage.includes('Closed')).reduce((sum, opp) => sum + ((Number(opp.value) || 0) * (Number(opp.probability) || 0) / 100), 0);
    const active = opportunities.filter(opp => !opp.stage.includes('Closed')).length;
    const won = opportunities.filter(opp => opp.stage === 'Closed Won').length;
    return { total, weighted, active, won };
  };

  const calculateEntityStats = (entityId) => {
    const entityOpps = opportunities.filter(o => o.entityId === entityId);
    const total = entityOpps.reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    const won = entityOpps.filter(o => o.stage === 'Closed Won').reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    const pipeline = entityOpps.filter(o => !o.stage.includes('Closed')).reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    return { total, won, pipeline, count: entityOpps.length };
  };

  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  const openForm = (item = null, type = 'opportunity') => {
    console.log('🔵 openForm called:', { item, type, userRole, isFormOpen });
    if (userRole === 'viewer' && type !== 'opportunity') return;
    setFormType(type);
    setEditingId(item?.id || null);
    setIsExtendedForm(false); // Reset to essential form
    
    if (type === 'opportunity') {
      setFormData(item || { 
        opportunity_name: '', 
        agency_id: '', 
        primary_contact_id: '', 
        entityId: '',
        forecastGroupId: '',
        value: '', 
        stage: 'Prospecting', 
        probability: 10, 
        close_date: '',
        opportunity_status: 'Active',
        priority: 'Medium',
        description: '',
        total_contract_value: '',
        expected_revenue: '',
        winning_price: '',
        target_gm_percent: '',
        target_oi_percent: '',
        p_go: '',
        forecast_category: '',
        included_in_forecast: false,
        project_start_date: '',
        planned_rfp_release_date: '',
        actual_rfp_release_date: '',
        planned_proposal_submission_date: '',
        actual_proposal_submission_date: '',
        contract_type: '',
        solicitation_number: '',
        acquisition_type: '',
        duration: '',
        place_of_performance: '',
        direct_award: false,
        incumbent: '',
        incumbent_contract_number: '',
        incumbent_award_date: '',
        incumbent_expire_date: '',
        db_competitor: '',
        winning_competitor: '',
        competitive_positioning: '',
        competitive_positioning_notes: '',
        client_intent_to_buy: '',
        client_intent_to_buy_notes: '',
        customer_insight: '',
        customer_insight_notes: '',
        relationships: '',
        relationships_notes: '',
        teaming: '',
        teaming_notes: '',
        key_personnel: '',
        proposal_manager_contact_id: '',
        primary_business_line: '',
        primary_naics_code: '',
        portfolio: '',
        revenue_stream: '',
        solution: '',
        solution_details: '',
        proposal_tech_volume: '',
        proposal_pricing: '',
        orals_site_visit: '',
        orals_site_visit_notes: '',
        proposal_comments: '',
        response_folder: '',
        bp_code: '',
        costpoint_project_code: '',
        govwin_id: '',
        legacy_id: '',
        opportunity_link: '',
        budget_confirmed: false,
        discovery_completed: false,
        roi_analysis_completed: false,
        front_door: false,
        loss_reason: '',
        customer_feedback: '',
        capabilities: [],
        notes: ''
      });
    } else if (type === 'entity') {
      setFormData(item || {
        name: '',
        ein: '',
        formationDate: '',
        state: '',
        sbaReportingDue: '',
        lastSbaReport: '',
        certifications: [],
        documents: [],
        notes: ''
      });
    } else if (type === 'forecast') {
      setFormData(item || {
        fiscalYear: new Date().getFullYear(),
        groups: forecastGroups.filter(g => g.isActive).map(g => ({ groupId: g.id, target: 0, actual: 0, pipeline: 0 })),
        notes: ''
      });
    } else if (type === 'agency') {
      setFormData(item || { name: '', city: '', state: '', agencyType: 'Federal', phone: '', website: '', address: '', zip: '' });
    } else if (type === 'contact') {
      setFormData(item || { agencyId: '', firstName: '', lastName: '', title: '', email: '', phone: '', mobile: '' });
    } else if (type === 'stage') {
      setFormData(item || { name: '', order: stages.length + 1, isActive: true });
    } else if (type === 'agencyType') {
      setFormData(item || { name: '', isActive: true });
    } else if (type === 'forecastGroup') {
      setFormData(item || { name: '', order: forecastGroups.length + 1, isActive: true });
    } else if (type === 'capabilityGroup') {
      setFormData(item || { name: '', order: capabilityGroups.length + 1, isActive: true });
    } else if (type === 'capability') {
      setFormData(item || { name: '', groupId: '', isActive: true });
    } else if (type === 'user') {
      setFormData(item || { username: '', password: '', email: '', firstName: '', lastName: '', role: 'sales', isActive: true });
    }
    
    if (!editingId) {
      setExpandedSections({ basic: true });
    }
    console.log('🟢 Setting isFormOpen to true');
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (formType === 'opportunity') {
      const oppData = { 
        ...formData, 
        value: Number(formData.value) || 0,
        probability: Number(formData.probability) || 0
      };
      setOpportunities(prev => editingId ? prev.map(o => o.id === editingId ? { ...oppData, id: editingId } : o) : [...prev, { ...oppData, id: Date.now() }]);
    } else if (formType === 'entity') {
      setEntities(prev => editingId ? prev.map(e => e.id === editingId ? { ...formData, id: editingId } : e) : [...prev, { ...formData, id: Date.now(), documents: [] }]);
    } else if (formType === 'forecast') {
      const forecastData = { ...formData, lastUpdated: new Date().toISOString().split('T')[0] };
      setForecasts(prev => editingId ? prev.map(f => f.id === editingId ? { ...forecastData, id: editingId } : f) : [...prev, { ...forecastData, id: Date.now() }]);
    } else if (formType === 'agency') {
      setAgencies(prev => editingId ? prev.map(a => a.id === editingId ? { ...formData, id: editingId } : a) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'contact') {
      setContacts(prev => editingId ? prev.map(c => c.id === editingId ? { ...formData, id: editingId } : c) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'stage') {
      setStages(prev => editingId ? prev.map(s => s.id === editingId ? { ...formData, id: editingId } : s) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'agencyType') {
      setAgencyTypes(prev => editingId ? prev.map(t => t.id === editingId ? { ...formData, id: editingId } : t) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'forecastGroup') {
      setForecastGroups(prev => editingId ? prev.map(g => g.id === editingId ? { ...formData, id: editingId } : g) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'capabilityGroup') {
      setCapabilityGroups(prev => editingId ? prev.map(g => g.id === editingId ? { ...formData, id: editingId } : g) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'capability') {
      setCapabilities(prev => editingId ? prev.map(c => c.id === editingId ? { ...formData, id: editingId } : c) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'user') {
      if (editingId) {
        const existingUser = users.find(u => u.id === editingId);
        const updatedUser = { 
          ...formData, 
          id: editingId,
          password: formData.password || existingUser.password
        };
        setUsers(prev => prev.map(u => u.id === editingId ? updatedUser : u));
      } else {
        setUsers(prev => [...prev, { ...formData, id: Date.now() }]);
      }
    }
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id, type = 'opportunity') => {
    if (userRole === 'viewer' || !window.confirm(`Delete this ${type}?`)) return;
    if (type === 'opportunity') setOpportunities(prev => prev.filter(o => o.id !== id));
    else if (type === 'entity') setEntities(prev => prev.filter(e => e.id !== id));
    else if (type === 'forecast') setForecasts(prev => prev.filter(f => f.id !== id));
    else if (type === 'agency') setAgencies(prev => prev.filter(a => a.id !== id));
    else if (type === 'contact') setContacts(prev => prev.filter(c => c.id !== id));
    else if (type === 'stage') setStages(prev => prev.filter(s => s.id !== id));
    else if (type === 'agencyType') setAgencyTypes(prev => prev.filter(t => t.id !== id));
    else if (type === 'forecastGroup') setForecastGroups(prev => prev.filter(g => g.id !== id));
    else if (type === 'capabilityGroup') setCapabilityGroups(prev => prev.filter(g => g.id !== id));
    else if (type === 'capability') setCapabilities(prev => prev.filter(c => c.id !== id));
    else if (type === 'user') setUsers(prev => prev.filter(u => u.id !== id));
  };

  const addDocument = (entityId, docName, docUrl) => {
    setEntities(prev => prev.map(e => e.id === entityId ? {
      ...e,
      documents: [...(e.documents || []), { id: Date.now(), name: docName, url: docUrl, uploadDate: new Date().toISOString().split('T')[0] }]
    } : e));
  };

  const removeDocument = (entityId, docId) => {
    setEntities(prev => prev.map(e => e.id === entityId ? {
      ...e,
      documents: e.documents.filter(d => d.id !== docId)
    } : e));
  };

  const stats = calculateStats();
  const activeStages = stages.filter(s => s.isActive).sort((a, b) => a.order - b.order);
  const activeForecastGroups = forecastGroups.filter(g => g.isActive).sort((a, b) => a.order - b.order);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <AuthScreen
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loginError={loginError}
      />
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        currentUser={currentUser} 
        userRole={userRole} 
        onLogout={() => { setIsAuthenticated(false); setCurrentUser(''); setUserRole(''); setUsername(''); setPassword(''); }} 
      />

      <TopNav activeView={activeView} setActiveView={setActiveView} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeView === 'dashboard' && (
          <Dashboard
            stats={stats}
            opportunities={opportunities}
            entities={entities}
            forecasts={forecasts}
            powerBIReports={powerBIReports}
            users={users}
            userRole={userRole}
            setActiveView={setActiveView}
            getAgencyName={getAgencyName}
            getContactName={getContactName}
            openForm={openForm}
            handleDelete={handleDelete}
          />
        )}

        {/* Sales Management View */}
        {activeView === 'sales' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Dashboard</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">Sales Management</h2>
              </div>
            </div>

            {/* Sub-navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button onClick={() => { setActiveView('opportunities'); setSearchTerm(''); setSortBy('opportunity_name'); setSortOrder('asc'); }} className="bg-white p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Opportunities</h3>
                <p className="text-sm text-gray-600">Manage sales pipeline</p>
                <p className="text-2xl font-bold text-indigo-600 mt-3">{opportunities.length}</p>
              </button>
              <button onClick={() => { setActiveView('agencies'); setSearchTerm(''); setSortBy('name'); setSortOrder('asc'); }} className="bg-white p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Agencies</h3>
                <p className="text-sm text-gray-600">Government organizations</p>
                <p className="text-2xl font-bold text-purple-600 mt-3">{agencies.length}</p>
              </button>
              <button onClick={() => { setActiveView('contacts'); setSearchTerm(''); setSortBy('firstName'); setSortOrder('asc'); }} className="bg-white p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Contacts</h3>
                <p className="text-sm text-gray-600">Key relationships</p>
                <p className="text-2xl font-bold text-blue-600 mt-3">{contacts.length}</p>
              </button>
            </div>
          </div>
        )}

        {/* Opportunities List View */}
        {activeView === 'opportunities' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('sales')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Sales Management</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">Opportunities</h2>
              </div>
              {userRole !== 'viewer' && (
                <button onClick={() => openForm()} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  <Plus className="w-5 h-5" />Add Opportunity
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                  <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">All Stages</option>
                    {activeStages.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="opportunity_name">Name</option>
                    <option value="value">Value</option>
                    <option value="probability">Probability</option>
                    <option value="close_date">Close Date</option>
                    <option value="agency_id">Agency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Opportunities Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Close Date</th>
                      {userRole !== 'viewer' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {opportunities
                      .filter(opp => {
                        const matchesSearch = !searchTerm || 
                          opp.opportunity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          getAgencyName(opp.agency_id).toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStage = !stageFilter || opp.stage === stageFilter;
                        return matchesSearch && matchesStage;
                      })
                      .sort((a, b) => {
                        let aVal = a[sortBy];
                        let bVal = b[sortBy];
                        if (sortBy === 'agency_id') {
                          aVal = getAgencyName(a.agency_id);
                          bVal = getAgencyName(b.agency_id);
                        }
                        if (typeof aVal === 'string') {
                          return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                        }
                        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
                      })
                      .map(opp => (
                        <tr key={opp.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{opp.opportunity_name}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{getAgencyName(opp.agency_id)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{opp.entityId ? getEntityName(opp.entityId) : '-'}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">${(Number(opp.value) || 0).toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              opp.stage === 'Closed Won' ? 'bg-green-100 text-green-800' : 
                              opp.stage === 'Closed Lost' ? 'bg-red-100 text-red-800' : 
                              opp.stage === 'Negotiation' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {opp.stage}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{opp.probability}%</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{opp.close_date}</td>
                          {userRole !== 'viewer' && (
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button onClick={() => openForm(opp)} className="text-indigo-600 hover:text-indigo-800">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(opp.id)} className="text-red-600 hover:text-red-800">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Agencies List View */}
        {activeView === 'agencies' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('sales')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Sales Management</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">Agencies</h2>
              </div>
              {userRole !== 'viewer' && (
                <button onClick={() => openForm(null, 'agency')} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  <Plus className="w-5 h-5" />Add Agency
                </button>
              )}
            </div>

            {/* Agencies Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agency Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Website</th>
                      {userRole !== 'viewer' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {agencies.map(agency => (
                      <tr key={agency.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{agency.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            {agency.agencyType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{agency.city}, {agency.state}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{agency.phone}</td>
                        <td className="px-6 py-4 text-sm text-indigo-600">{agency.website}</td>
                        {userRole !== 'viewer' && (
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => openForm(agency, 'agency')} className="text-purple-600 hover:text-purple-800">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(agency.id, 'agency')} className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts List View */}
        {activeView === 'contacts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('sales')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Sales Management</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
              </div>
              {userRole !== 'viewer' && (
                <button onClick={() => openForm(null, 'contact')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="w-5 h-5" />Add Contact
                </button>
              )}
            </div>

            {/* Contacts Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      {userRole !== 'viewer' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map(contact => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{contact.firstName} {contact.lastName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{getAgencyName(contact.agencyId)}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.title}</td>
                        <td className="px-6 py-4 text-sm text-indigo-600">{contact.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.phone}</td>
                        {userRole !== 'viewer' && (
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => openForm(contact, 'contact')} className="text-blue-600 hover:text-blue-800">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(contact.id, 'contact')} className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Entity Management View */}
        {activeView === 'entities' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Dashboard</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">Entity Management</h2>
              </div>
              {userRole === 'admin' && (
                <button onClick={() => openForm(null, 'entity')} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  <Plus className="w-5 h-5" />Add Entity
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {entities.map(entity => {
                const entityStats = calculateEntityStats(entity.id);
                const daysUntilReport = entity.sbaReportingDue ? Math.ceil((new Date(entity.sbaReportingDue) - new Date()) / (1000 * 60 * 60 * 24)) : null;
                
                return (
                  <div key={entity.id} className="bg-white rounded-lg border shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{entity.name}</h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">{entity.state}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">EIN: {entity.ein}</p>
                        <p className="text-sm text-gray-600 mb-3">Formation Date: {entity.formationDate}</p>
                        
                        {entity.certifications.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {entity.certifications.map((cert, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">{cert}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      {userRole === 'admin' && (
                        <div className="flex gap-2">
                          <button onClick={() => openForm(entity, 'entity')} className="text-purple-600 hover:text-purple-800">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(entity.id, 'entity')} className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-700 mb-1">Total Revenue</p>
                        <p className="text-lg font-bold text-green-900">${entityStats.won.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-700 mb-1">Pipeline</p>
                        <p className="text-lg font-bold text-blue-900">${entityStats.pipeline.toLocaleString()}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-xs text-orange-700 mb-1">Opportunities</p>
                        <p className="text-lg font-bold text-orange-900">{entityStats.count}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${daysUntilReport && daysUntilReport < 30 ? 'bg-red-50' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${daysUntilReport && daysUntilReport < 30 ? 'text-red-700' : 'text-gray-700'}`}>SBA Report Due</p>
                        <p className={`text-lg font-bold ${daysUntilReport && daysUntilReport < 30 ? 'text-red-900' : 'text-gray-900'}`}>
                          {daysUntilReport ? `${daysUntilReport}d` : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Documents ({entity.documents?.length || 0})
                        </h4>
                        {userRole === 'admin' && (
                          <button 
                            onClick={() => {
                              const name = prompt('Document name:');
                              const url = prompt('Document URL:');
                              if (name && url) addDocument(entity.id, name, url);
                            }}
                            className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                          >
                            <Upload className="w-4 h-4" />
                            Add Document
                          </button>
                        )}
                      </div>
                      {entity.documents?.length > 0 ? (
                        <div className="space-y-2">
                          {entity.documents.map(doc => (
                            <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex-1">
                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                                  {doc.name}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                                <p className="text-xs text-gray-500">Uploaded: {doc.uploadDate}</p>
                              </div>
                              {userRole === 'admin' && (
                                <button onClick={() => removeDocument(entity.id, doc.id)} className="text-red-600 hover:text-red-800">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No documents uploaded</p>
                      )}
                    </div>

                    {entity.notes && (
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm text-gray-700">{entity.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sales Targets View */}
        {activeView === 'targets' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Dashboard</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">Sales Targets & Forecasts</h2>
              </div>
              {userRole === 'admin' && (
                <button onClick={() => openForm(null, 'forecast')} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  <Plus className="w-5 h-5" />Add Forecast
                </button>
              )}
            </div>

            {forecasts.map(forecast => {
              const totalTarget = forecast.groups.reduce((sum, g) => sum + (Number(g.target) || 0), 0);
              const totalActual = forecast.groups.reduce((sum, g) => sum + (Number(g.actual) || 0), 0);
              const totalPipeline = forecast.groups.reduce((sum, g) => sum + (Number(g.pipeline) || 0), 0);
              const achievementRate = totalTarget > 0 ? (totalActual / totalTarget * 100).toFixed(1) : 0;
              
              return (
                <div key={forecast.id} className="bg-white rounded-lg border shadow-sm p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Fiscal Year {forecast.fiscalYear}
                      </h3>
                      <p className="text-sm text-gray-600">Last updated: {forecast.lastUpdated}</p>
                    </div>
                    {userRole === 'admin' && (
                      <div className="flex gap-2">
                        <button onClick={() => openForm(forecast, 'forecast')} className="text-green-600 hover:text-green-800">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(forecast.id, 'forecast')} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs text-blue-700 mb-1">Total Target</p>
                      <p className="text-2xl font-bold text-blue-900">${totalTarget.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-xs text-green-700 mb-1">Total Actual</p>
                      <p className="text-2xl font-bold text-green-900">${totalActual.toLocaleString()}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-xs text-orange-700 mb-1">Pipeline</p>
                      <p className="text-2xl font-bold text-orange-900">${totalPipeline.toLocaleString()}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${achievementRate >= 90 ? 'bg-emerald-50' : achievementRate >= 70 ? 'bg-yellow-50' : 'bg-red-50'}`}>
                      <p className={`text-xs mb-1 ${achievementRate >= 90 ? 'text-emerald-700' : achievementRate >= 70 ? 'text-yellow-700' : 'text-red-700'}`}>Achievement</p>
                      <p className={`text-2xl font-bold ${achievementRate >= 90 ? 'text-emerald-900' : achievementRate >= 70 ? 'text-yellow-900' : 'text-red-900'}`}>{achievementRate}%</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Target</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actual</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Pipeline</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">% Achieved</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gap</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {forecast.groups.map(group => {
                          const groupName = getForecastGroupName(group.groupId);
                          const achievement = group.target > 0 ? (group.actual / group.target * 100).toFixed(1) : 0;
                          const gap = group.target - group.actual;
                          
                          return (
                            <tr key={group.groupId} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900">{groupName}</td>
                              <td className="px-4 py-3 text-right text-gray-900">${group.target.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right font-medium text-green-700">${group.actual.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right text-orange-700">${group.pipeline.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${achievement >= 90 ? 'bg-emerald-100 text-emerald-800' : achievement >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {achievement}%
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-gray-900">${gap.toLocaleString()}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {forecast.notes && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-700">{forecast.notes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Reporting View */}
        {activeView === 'reporting' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Dashboard</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">Power BI Reports</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {powerBIReports.map(report => (
                <div key={report.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{report.name}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      <a 
                        href={report.embedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        Open in Power BI
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-8 text-center">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Power BI Report Embed</p>
                    <p className="text-sm text-gray-500">In production, this would display an embedded Power BI report using the iframe embed code.</p>
                    <a 
                      href={report.embedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      View Report
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Power BI Integration</h4>
                  <p className="text-sm text-blue-800">To embed Power BI reports, you'll need to:</p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4 list-disc">
                    <li>Publish reports to Power BI Service</li>
                    <li>Generate embed tokens using Power BI REST API</li>
                    <li>Use the embed URL in an iframe or Power BI JavaScript SDK</li>
                    <li>Configure security and permissions appropriately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuration View */}
        {activeView === 'configuration' && userRole === 'admin' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span className="font-medium">Back to Dashboard</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
              </div>
            </div>

            <div className="space-y-6">
              {/* Sales Stages */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Sales Stages</h3>
                  <button onClick={() => openForm(null, 'stage')} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 text-sm">
                    <Plus className="w-4 h-4" />Add Stage
                  </button>
                </div>
                <div className="space-y-2">
                  {stages.sort((a, b) => a.order - b.order).map(stage => (
                    <div key={stage.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{stage.order}.</span>
                        <span className="text-sm font-medium text-gray-900">{stage.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${stage.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {stage.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openForm(stage, 'stage')} className="text-indigo-600 hover:text-indigo-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(stage.id, 'stage')} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agency Types */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Agency Types</h3>
                  <button onClick={() => openForm(null, 'agencyType')} className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 text-sm">
                    <Plus className="w-4 h-4" />Add Type
                  </button>
                </div>
                <div className="space-y-2">
                  {agencyTypes.map(type => (
                    <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{type.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${type.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {type.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openForm(type, 'agencyType')} className="text-purple-600 hover:text-purple-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(type.id, 'agencyType')} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forecast Groups */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Forecast Groups</h3>
                  <button onClick={() => openForm(null, 'forecastGroup')} className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 text-sm">
                    <Plus className="w-4 h-4" />Add Group
                  </button>
                </div>
                <div className="space-y-2">
                  {forecastGroups.sort((a, b) => a.order - b.order).map(group => (
                    <div key={group.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{group.order}.</span>
                        <span className="text-sm font-medium text-gray-900">{group.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${group.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {group.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openForm(group, 'forecastGroup')} className="text-green-600 hover:text-green-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(group.id, 'forecastGroup')} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capability Groups & Capabilities */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Capability Groups & Capabilities</h3>
                  <div className="flex gap-2">
                    <button onClick={() => openForm(null, 'capabilityGroup')} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm">
                      <Plus className="w-4 h-4" />Add Group
                    </button>
                    <button onClick={() => openForm(null, 'capability')} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm">
                      <Plus className="w-4 h-4" />Add Capability
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {capabilityGroups.sort((a, b) => a.order - b.order).map(group => (
                    <div key={group.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-900">{group.name}</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${group.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {group.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openForm(group, 'capabilityGroup')} className="text-blue-600 hover:text-blue-800">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(group.id, 'capabilityGroup')} className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 ml-4">
                        {capabilities.filter(c => c.groupId === group.id).map(capability => (
                          <div key={capability.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{capability.name}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${capability.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {capability.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => openForm(capability, 'capability')} className="text-blue-600 hover:text-blue-800">
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button onClick={() => handleDelete(capability.id, 'capability')} className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Users */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Users</h3>
                  <button onClick={() => openForm(null, 'user')} className="flex items-center gap-2 bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 text-sm">
                    <Plus className="w-4 h-4" />Add User
                  </button>
                </div>
                <div className="space-y-2">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                        <span className="text-xs text-gray-500">({user.username})</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'sales' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openForm(user, 'user')} className="text-amber-600 hover:text-amber-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(user.id, 'user')} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Forms Modal */}
        {isFormOpen && (
          <div 
            key={`${formType}-${editingId || 'new'}`}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setIsFormOpen(false);
                setEditingId(null);
                setFormData({});
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full h-[90vh] flex flex-col">
              <div className="p-6 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {editingId ? 'Edit' : 'New'} {
                      formType === 'opportunity' ? 'Opportunity' :
                      formType === 'entity' ? 'Entity' :
                      formType === 'forecast' ? 'Forecast' :
                      formType === 'agency' ? 'Agency' :
                      formType === 'contact' ? 'Contact' :
                      formType === 'stage' ? 'Sales Stage' :
                      formType === 'agencyType' ? 'Agency Type' :
                      formType === 'forecastGroup' ? 'Forecast Group' :
                      formType === 'capabilityGroup' ? 'Capability Group' :
                      formType === 'capability' ? 'Capability' :
                      formType === 'user' ? 'User' : ''
                    }
                  </h2>
                  {formType === 'opportunity' && (
                    <button
                      onClick={() => setIsExtendedForm(!isExtendedForm)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      {isExtendedForm ? 'Essential Fields' : 'All Fields'}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExtendedForm ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1 p-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
                {formType === 'entity' && (
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-md font-semibold text-gray-900 mb-4">Basic Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Entity Name *</label>
                            <input key="entity-name" type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">EIN *</label>
                            <input key="entity-ein" type="text" value={formData.ein || ''} onChange={(e) => setFormData({...formData, ein: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="12-3456789" required />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Formation Date</label>
                            <input key="entity-formation" type="date" value={formData.formationDate || ''} onChange={(e) => setFormData({...formData, formationDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input key="entity-state" type="text" value={formData.state || ''} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SBA Reporting Due Date</label>
                            <input key="entity-sba-due" type="date" value={formData.sbaReportingDue || ''} onChange={(e) => setFormData({...formData, sbaReportingDue: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last SBA Report</label>
                            <input key="entity-sba-last" type="date" value={formData.lastSbaReport || ''} onChange={(e) => setFormData({...formData, lastSbaReport: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                          <input 
                            key="entity-certs"
                            type="text" 
                            value={(formData.certifications || []).join(', ')} 
                            onChange={(e) => setFormData({...formData, certifications: e.target.value.split(',').map(c => c.trim()).filter(Boolean)})} 
                            className="w-full px-3 py-2 border rounded-lg" 
                            placeholder="8(a), SDVOSB, HUBZone (comma separated)"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                          <textarea key="entity-notes" value={formData.notes || ''} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows="3" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formType === 'opportunity' && (
                  <>
                    <Section title="Basic Information" sectionKey="basic" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Name *</label>
                        <input key="opp-name" type="text" value={formData.opportunity_name || ''} onChange={(e) => setFormData({...formData, opportunity_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Agency *</label>
                          <select key="opp-agency" value={formData.agency_id || ''} onChange={(e) => setFormData({...formData, agency_id: Number(e.target.value), primary_contact_id: ''})} className="w-full px-3 py-2 border rounded-lg" required>
                            <option value="">Select Agency</option>
                            {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact</label>
                          <select key="opp-contact" value={formData.primary_contact_id || ''} onChange={(e) => setFormData({...formData, primary_contact_id: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" disabled={!formData.agency_id}>
                            <option value="">Select Contact</option>
                            {formData.agency_id && getAgencyContacts(formData.agency_id).map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Entity *</label>
                          <select key="opp-entity" value={formData.entityId || ''} onChange={(e) => setFormData({...formData, entityId: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" required>
                            <option value="">Select Entity</option>
                            {entities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Forecast Group</label>
                          <select key="opp-forecast" value={formData.forecastGroupId || ''} onChange={(e) => setFormData({...formData, forecastGroupId: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg">
                            <option value="">Select Group</option>
                            {activeForecastGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stage *</label>
                          <select key="opp-stage" value={formData.stage || ''} onChange={(e) => setFormData({...formData, stage: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required>
                            {activeStages.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%) *</label>
                          <input key="opp-prob" type="number" value={formData.probability || ''} onChange={(e) => setFormData({...formData, probability: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" min="0" max="100" required />
                        </div>
                      </div>
                      {isExtendedForm && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                              <select key="opp-status" value={formData.opportunity_status || ''} onChange={(e) => setFormData({...formData, opportunity_status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                              <select key="opp-priority" value={formData.priority || ''} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea key="opp-desc" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" className="w-full px-3 py-2 border rounded-lg" />
                          </div>
                        </>
                      )}
                    </Section>

                    <Section title="Financial Information" sectionKey="financial" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Value *</label>
                          <input key="opp-value" type="number" value={formData.value || ''} onChange={(e) => setFormData({...formData, value: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date *</label>
                          <input key="opp-close" type="date" value={formData.close_date || ''} onChange={(e) => setFormData({...formData, close_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                      </div>
                      {isExtendedForm && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Total Contract Value (TCV)</label>
                              <input key="opp-tcv" type="number" value={formData.total_contract_value || ''} onChange={(e) => setFormData({...formData, total_contract_value: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Revenue</label>
                              <input key="opp-revenue" type="number" value={formData.expected_revenue || ''} onChange={(e) => setFormData({...formData, expected_revenue: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Winning Price</label>
                              <input key="opp-win-price" type="number" value={formData.winning_price || ''} onChange={(e) => setFormData({...formData, winning_price: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">P-Go (%)</label>
                              <input key="opp-pgo" type="number" value={formData.p_go || ''} onChange={(e) => setFormData({...formData, p_go: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" max="100" step="0.1" />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Target GM %</label>
                              <input key="opp-gm" type="number" value={formData.target_gm_percent || ''} onChange={(e) => setFormData({...formData, target_gm_percent: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" max="100" step="0.1" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Target OI %</label>
                              <input key="opp-oi" type="number" value={formData.target_oi_percent || ''} onChange={(e) => setFormData({...formData, target_oi_percent: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" max="100" step="0.1" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Forecast Category</label>
                              <select key="opp-forecast-cat" value={formData.forecast_category || ''} onChange={(e) => setFormData({...formData, forecast_category: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                                <option value="">Select</option>
                                <option value="Pipeline">Pipeline</option>
                                <option value="Best Case">Best Case</option>
                                <option value="Commit">Commit</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="flex items-center gap-2">
                              <input key="opp-in-forecast" type="checkbox" checked={formData.included_in_forecast || false} onChange={(e) => setFormData({...formData, included_in_forecast: e.target.checked})} className="rounded" />
                              <span className="text-sm font-medium text-gray-700">Included in Forecast</span>
                            </label>
                          </div>
                        </>
                      )}
                    </Section>

                    <Section title="Key Dates" sectionKey="dates" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Project Start Date</label>
                          <input key="opp-start" type="date" value={formData.project_start_date || ''} onChange={(e) => setFormData({...formData, project_start_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Planned RFP Release</label>
                          <input key="opp-rfp-plan" type="date" value={formData.planned_rfp_release_date || ''} onChange={(e) => setFormData({...formData, planned_rfp_release_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Actual RFP Release</label>
                          <input key="opp-rfp-actual" type="date" value={formData.actual_rfp_release_date || ''} onChange={(e) => setFormData({...formData, actual_rfp_release_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Planned Proposal Submission</label>
                          <input key="opp-prop-plan" type="date" value={formData.planned_proposal_submission_date || ''} onChange={(e) => setFormData({...formData, planned_proposal_submission_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Actual Proposal Submission</label>
                        <input key="opp-prop-actual" type="date" value={formData.actual_proposal_submission_date || ''} onChange={(e) => setFormData({...formData, actual_proposal_submission_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                    </Section>

                    <Section title="Contract Information" sectionKey="contract" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                          <select key="opp-contract-type" value={formData.contract_type || ''} onChange={(e) => setFormData({...formData, contract_type: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                            <option value="">Select</option>
                            <option value="FFP">Firm Fixed Price (FFP)</option>
                            <option value="T&M">Time & Materials (T&M)</option>
                            <option value="Cost Plus">Cost Plus</option>
                            <option value="IDIQ">IDIQ</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Solicitation Number</label>
                          <input key="opp-sol" type="text" value={formData.solicitation_number || ''} onChange={(e) => setFormData({...formData, solicitation_number: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Acquisition Type</label>
                          <select key="opp-acq-type" value={formData.acquisition_type || ''} onChange={(e) => setFormData({...formData, acquisition_type: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                            <option value="">Select</option>
                            <option value="Full and Open">Full and Open</option>
                            <option value="Set Aside">Set Aside</option>
                            <option value="Sole Source">Sole Source</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                          <input key="opp-duration" type="number" value={formData.duration || ''} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2 border rounded-lg" min="0" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Place of Performance</label>
                        <input key="opp-place" type="text" value={formData.place_of_performance || ''} onChange={(e) => setFormData({...formData, place_of_performance: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input key="opp-direct" type="checkbox" checked={formData.direct_award || false} onChange={(e) => setFormData({...formData, direct_award: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">Direct Award</span>
                        </label>
                      </div>
                    </Section>

                    <Section title="Competitive Information" sectionKey="competitive" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Incumbent</label>
                          <input key="opp-incumbent" type="text" value={formData.incumbent || ''} onChange={(e) => setFormData({...formData, incumbent: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Incumbent Contract #</label>
                          <input key="opp-inc-contract" type="text" value={formData.incumbent_contract_number || ''} onChange={(e) => setFormData({...formData, incumbent_contract_number: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">DB Competitor</label>
                          <input key="opp-db-comp" type="text" value={formData.db_competitor || ''} onChange={(e) => setFormData({...formData, db_competitor: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Winning Competitor</label>
                          <input key="opp-win-comp" type="text" value={formData.winning_competitor || ''} onChange={(e) => setFormData({...formData, winning_competitor: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                    </Section>

                    <Section title="Business Classification" sectionKey="business" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Business Line</label>
                          <input key="opp-biz-line" type="text" value={formData.primary_business_line || ''} onChange={(e) => setFormData({...formData, primary_business_line: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Primary NAICS Code</label>
                          <input key="opp-naics" type="text" value={formData.primary_naics_code || ''} onChange={(e) => setFormData({...formData, primary_naics_code: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                          <input key="opp-portfolio" type="text" value={formData.portfolio || ''} onChange={(e) => setFormData({...formData, portfolio: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Stream</label>
                          <input key="opp-rev-stream" type="text" value={formData.revenue_stream || ''} onChange={(e) => setFormData({...formData, revenue_stream: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                    </Section>

                    <Section title="Project Codes & References" sectionKey="codes" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">B&P Code</label>
                          <input key="opp-bp" type="text" value={formData.bp_code || ''} onChange={(e) => setFormData({...formData, bp_code: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CostPoint Project Code</label>
                          <input key="opp-cp" type="text" value={formData.costpoint_project_code || ''} onChange={(e) => setFormData({...formData, costpoint_project_code: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">GovWin ID</label>
                          <input key="opp-govwin" type="text" value={formData.govwin_id || ''} onChange={(e) => setFormData({...formData, govwin_id: e.target.value})} className="w-full px-3 py-2 border rounded-lg" maxLength="6" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Legacy ID</label>
                          <input key="opp-legacy" type="text" value={formData.legacy_id || ''} onChange={(e) => setFormData({...formData, legacy_id: e.target.value})} className="w-full px-3 py-2 border rounded-lg" maxLength="10" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Link</label>
                        <input key="opp-link" type="text" value={formData.opportunity_link || ''} onChange={(e) => setFormData({...formData, opportunity_link: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." />
                      </div>
                    </Section>

                    <Section title="Status & Flags" sectionKey="status" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input key="opp-budget" type="checkbox" checked={formData.budget_confirmed || false} onChange={(e) => setFormData({...formData, budget_confirmed: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">Budget Confirmed</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input key="opp-discovery" type="checkbox" checked={formData.discovery_completed || false} onChange={(e) => setFormData({...formData, discovery_completed: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">Discovery Completed</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input key="opp-roi" type="checkbox" checked={formData.roi_analysis_completed || false} onChange={(e) => setFormData({...formData, roi_analysis_completed: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">ROI Analysis Completed</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input key="opp-front" type="checkbox" checked={formData.front_door || false} onChange={(e) => setFormData({...formData, front_door: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">Front Door</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loss / No-Bid Reason</label>
                        <input key="opp-loss" type="text" value={formData.loss_reason || ''} onChange={(e) => setFormData({...formData, loss_reason: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Feedback / Debrief</label>
                        <textarea key="opp-feedback" value={formData.customer_feedback || ''} onChange={(e) => setFormData({...formData, customer_feedback: e.target.value})} rows="3" className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                    </Section>
                  </>
                )}

                {formType === 'capabilityGroup' && (
                  <>
                    <Section title="Capability Group Details" sectionKey="basic" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Group Name *</label>
                        <input key="capgroup-name" type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <input key="capgroup-order" type="number" value={formData.order || ''} onChange={(e) => setFormData({...formData, order: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" min="1" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input key="capgroup-active" type="checkbox" checked={formData.isActive !== false} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>
                      </div>
                    </Section>
                  </>
                )}

                {formType === 'capability' && (
                  <>
                    <Section title="Capability Details" sectionKey="basic" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capability Name *</label>
                        <input key="cap-name" type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capability Group *</label>
                        <select key="cap-group" value={formData.groupId || ''} onChange={(e) => setFormData({...formData, groupId: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" required>
                          <option value="">Select Group</option>
                          {capabilityGroups.filter(g => g.isActive).map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input key="cap-active" type="checkbox" checked={formData.isActive !== false} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>
                      </div>
                    </Section>
                  </>
                )}

                {formType === 'user' && (
                  <>
                    <Section title="User Details" sectionKey="basic" expandedSections={expandedSections} toggleSection={toggleSection}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                          <input key="user-first" type="text" value={formData.firstName || ''} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                          <input key="user-last" type="text" value={formData.lastName || ''} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input key="user-email" type="email" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                        <input key="user-username" type="text" value={formData.username || ''} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password {editingId && '(leave blank to keep current)'}</label>
                        <input key="user-password" type="password" value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required={!editingId} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select key="user-role" value={formData.role || 'sales'} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                          <option value="admin">Admin</option>
                          <option value="sales">Sales</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input key="user-active" type="checkbox" checked={formData.isActive !== false} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="rounded" />
                          <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>
                      </div>
                    </Section>
                  </>
                )}
              </div>

              <div className="flex gap-3 p-6 border-t bg-white flex-shrink-0">
                <button onClick={handleSubmit} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium">
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button onClick={() => { setIsFormOpen(false); setEditingId(null); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default MySalesOps;

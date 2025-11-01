import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOpportunities } from '../hooks/useOpportunities';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Save, ChevronDown, ChevronRight } from 'lucide-react';

// Collapsible Section Component
const CollapsibleSection = ({ title, subtitle, isOpen, onToggle, children, badge }) => (
  <div style={{
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '16px',
    background: 'white',
    transition: 'all 0.2s',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
  }}>
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fafafa',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderBottom: isOpen ? '1px solid #e5e7eb' : 'none'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
      onMouseLeave={(e) => e.currentTarget.style.background = '#fafafa'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: 0 }}>
          {title}
        </h3>
        {badge && (
          <span style={{
            padding: '3px 10px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '700',
            background: '#dbeafe',
            color: '#1e40af',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {badge}
          </span>
        )}
      </div>
      {isOpen ? (
        <ChevronDown style={{ width: '18px', height: '18px', color: '#6b7280' }} />
      ) : (
        <ChevronRight style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
      )}
    </button>
    {isOpen && (
      <div style={{ padding: '24px 20px', background: '#ffffff' }}>
        {children}
      </div>
    )}
  </div>
);

// Form Grid Component
const FormGrid = ({ children, columns = 2 }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 1 ? '100%' : '300px'}, 1fr))`,
    gap: '16px 20px',
    marginBottom: '8px'
  }}>
    {children}
  </div>
);

// Form Field Component
const FormField = ({ label, required, error, children, help }) => (
  <div style={{ marginBottom: '4px' }}>
    <label style={{
      display: 'block',
      fontSize: '13px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '6px',
      letterSpacing: '0.01em'
    }}>
      {label}
      {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
    </label>
    {children}
    {help && (
      <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>
        {help}
      </p>
    )}
    {error && (
      <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '500' }}>
        {error}
      </p>
    )}
  </div>
);

export const OpportunityFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const {
    opportunities,
    addOpportunity,
    updateOpportunity
  } = useOpportunities();
  const { agencies, contacts, entities, forecastGroups, activeStages, contractVehicles } = useApp();

  const isEditing = !!id;
  const existingOpportunity = isEditing
    ? opportunities.find(opp => opp.id === parseInt(id))
    : null;

  // Section collapse states
  const [sections, setSections] = useState({
    basic: true,
    financial: false,
    timeline: false,
    sales: false,
    technical: false,
    additional: false,
    notes: false
  });

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const [formData, setFormData] = useState({
    // Basic Information
    opportunity_name: '',
    agency_id: '',
    primary_contact_id: '',
    contractVehicleId: '',
    stage: 'Prospecting',
    type: '',
    priority: '',
    opportunity_status: '',

    // Financial
    value: '',
    total_contract_value: '',
    expected_revenue: '',
    probability: '',
    p_go: '',
    target_gm_percent: '',
    target_oi_percent: '',

    // Timeline & Dates
    close_date: '',
    project_start_date: '',
    project_finish_date: '',
    planned_rfp_release_date: '',
    actual_rfp_release_date: '',
    planned_proposal_submission_date: '',
    actual_proposal_submission_date: '',
    planned_rfi_ss_submission_date: '',
    actual_rfi_ss_submission_date: '',
    duration: '',

    // Sales & Strategy
    forecast_category: '',
    included_in_forecast: false,
    acquisition_type: '',
    contract_type: '',
    solicitation_number: '',
    govwin_id: '',
    opportunity_link: '',
    direct_award: false,
    front_door: false,

    // Technical & Delivery
    primary_business_line: '',
    primary_naics_code: '',
    solution: '',
    solution_details: '',
    key_personnel: '',
    capabilities: [],

    // Risk & Analysis
    budget_confirmed: false,
    discovery_completed: false,
    roi_analysis_completed: false,
    risk: '',
    risk_notes: '',

    // Relationships & Competition
    entityId: '',
    forecastGroupId: '',
    bidding_entity: '',
    bidding_entity_role: '',
    teaming: '',
    teaming_notes: '',
    incumbent: '',
    incumbent_award_date: '',
    incumbent_expire_date: '',
    db_competitor: '',
    winning_competitor: '',
    winning_price: '',

    // Additional Details
    description: '',
    notes: '',
    customer_debrief: '',
    proposal_comments: '',
    b_p_code: '',
    costpoint_project_code: '',
    proposal_id: '',
    response_folder: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingOpportunity) {
      setFormData(existingOpportunity);
    }
  }, [existingOpportunity]);

  const canEdit = userRole === 'admin' || userRole === 'sales';

  if (!canEdit) {
    navigate('/opportunities');
    return null;
  }

  if (isEditing && !existingOpportunity) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Opportunity not found.</p>
          <button
            onClick={() => navigate('/opportunities')}
            className="btn-secondary mt-4"
          >
            Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.opportunity_name?.trim()) {
      newErrors.opportunity_name = 'Opportunity name is required';
    }
    if (!formData.agency_id) {
      newErrors.agency_id = 'Agency is required';
    }
    if (!formData.stage) {
      newErrors.stage = 'Stage is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isEditing) {
      updateOpportunity(parseInt(id), formData);
    } else {
      addOpportunity(formData);
    }

    navigate('/opportunities');
  };

  const handleCancel = () => {
    navigate('/opportunities');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px', background: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={handleCancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#6b7280',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '16px',
            padding: '4px 0',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#111827'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back to Opportunities
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              {isEditing ? 'Edit Opportunity' : 'Create New Opportunity'}
            </h1>
            <p style={{ color: '#6b7280', fontSize: '15px' }}>
              {isEditing
                ? `Editing: ${existingOpportunity?.opportunity_name}`
                : 'Fill in the details below to create a new sales opportunity'}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <Save style={{ width: '16px', height: '16px' }} />
            {isEditing ? 'Save Changes' : 'Create Opportunity'}
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <CollapsibleSection
          title="Basic Information"
          badge="Required"
          isOpen={sections.basic}
          onToggle={() => toggleSection('basic')}
        >
          <FormGrid>
            <FormField label="Opportunity Name" required error={errors.opportunity_name}>
              <input
                type="text"
                className="form-input"
                value={formData.opportunity_name}
                onChange={(e) => handleChange('opportunity_name', e.target.value)}
                placeholder="Enter opportunity name"
                style={errors.opportunity_name ? { borderColor: '#ef4444' } : {}}
              />
            </FormField>

            <FormField label="Agency" required error={errors.agency_id}>
              <select
                className="form-select"
                value={formData.agency_id}
                onChange={(e) => handleChange('agency_id', e.target.value)}
                style={errors.agency_id ? { borderColor: '#ef4444' } : {}}
              >
                <option value="">Select Agency</option>
                {agencies.map(agency => (
                  <option key={agency.id} value={agency.id}>{agency.name}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Primary Contact">
              <select
                className="form-select"
                value={formData.primary_contact_id}
                onChange={(e) => handleChange('primary_contact_id', e.target.value)}
              >
                <option value="">Select Contact</option>
                {contacts.map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.firstName} {contact.lastName}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Contract Vehicle">
              <select
                className="form-select"
                value={formData.contractVehicleId}
                onChange={(e) => handleChange('contractVehicleId', e.target.value)}
              >
                <option value="">Select Contract Vehicle</option>
                {contractVehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.vehicleType})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Stage" required error={errors.stage}>
              <select
                className="form-select"
                value={formData.stage}
                onChange={(e) => handleChange('stage', e.target.value)}
                style={errors.stage ? { borderColor: '#ef4444' } : {}}
              >
                {activeStages.map(stage => (
                  <option key={stage.name} value={stage.name}>{stage.name}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Type">
              <select
                className="form-select"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="New Business">New Business</option>
                <option value="Existing Business">Existing Business</option>
                <option value="Renewal">Renewal</option>
              </select>
            </FormField>

            <FormField label="Priority">
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Business Line Priority">Business Line Priority</option>
              </select>
            </FormField>

            <FormField label="Opportunity Status">
              <input
                type="text"
                className="form-input"
                value={formData.opportunity_status}
                onChange={(e) => handleChange('opportunity_status', e.target.value)}
                placeholder="e.g., Pre-Solicitation"
              />
            </FormField>

            <FormField label="Entity">
              <select
                className="form-select"
                value={formData.entityId}
                onChange={(e) => handleChange('entityId', e.target.value)}
              >
                <option value="">Select Entity</option>
                {entities.map(entity => (
                  <option key={entity.id} value={entity.id}>{entity.name}</option>
                ))}
              </select>
            </FormField>
          </FormGrid>
        </CollapsibleSection>

        {/* Financial Information */}
        <CollapsibleSection
          title="Financial Information"
          isOpen={sections.financial}
          onToggle={() => toggleSection('financial')}
        >
          <FormGrid>
            <FormField label="Amount ($)" help="Opportunity value">
              <input
                type="number"
                className="form-input"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value)}
                placeholder="0"
              />
            </FormField>

            <FormField label="Total Contract Value ($)" help="TCV">
              <input
                type="number"
                className="form-input"
                value={formData.total_contract_value}
                onChange={(e) => handleChange('total_contract_value', e.target.value)}
                placeholder="0"
              />
            </FormField>

            <FormField label="Expected Revenue ($)">
              <input
                type="number"
                className="form-input"
                value={formData.expected_revenue}
                onChange={(e) => handleChange('expected_revenue', e.target.value)}
                placeholder="0"
              />
            </FormField>

            <FormField label="Probability (%)" help="Chance of winning">
              <input
                type="number"
                className="form-input"
                value={formData.probability}
                onChange={(e) => handleChange('probability', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
              />
            </FormField>

            <FormField label="P/Go (%)" help="Probability to Go">
              <input
                type="number"
                className="form-input"
                value={formData.p_go}
                onChange={(e) => handleChange('p_go', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
              />
            </FormField>

            <FormField label="Target GM (%)">
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={formData.target_gm_percent}
                onChange={(e) => handleChange('target_gm_percent', e.target.value)}
                placeholder="0.0"
              />
            </FormField>

            <FormField label="Target OI (%)">
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={formData.target_oi_percent}
                onChange={(e) => handleChange('target_oi_percent', e.target.value)}
                placeholder="0.0"
              />
            </FormField>

            <FormField label="Forecast Category">
              <select
                className="form-select"
                value={formData.forecast_category}
                onChange={(e) => handleChange('forecast_category', e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Pipeline">Pipeline</option>
                <option value="Best Case">Best Case</option>
                <option value="Commit">Commit</option>
                <option value="Omitted">Omitted</option>
                <option value="Closed">Closed</option>
              </select>
            </FormField>
          </FormGrid>

          <div style={{ marginTop: '20px' }}>
            <FormField label="">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.included_in_forecast}
                  onChange={(e) => handleChange('included_in_forecast', e.target.checked)}
                />
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                  Include in Forecast
                </span>
              </label>
            </FormField>
          </div>
        </CollapsibleSection>

        {/* Timeline & Dates */}
        <CollapsibleSection
          title="Key Dates"
          isOpen={sections.timeline}
          onToggle={() => toggleSection('timeline')}
        >
          <FormGrid>
            <FormField label="Close Date">
              <input
                type="date"
                className="form-input"
                value={formData.close_date}
                onChange={(e) => handleChange('close_date', e.target.value)}
              />
            </FormField>

            <FormField label="Duration (months)">
              <input
                type="number"
                className="form-input"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="0"
              />
            </FormField>

            <FormField label="Project Start Date">
              <input
                type="date"
                className="form-input"
                value={formData.project_start_date}
                onChange={(e) => handleChange('project_start_date', e.target.value)}
              />
            </FormField>

            <FormField label="Project Finish Date">
              <input
                type="date"
                className="form-input"
                value={formData.project_finish_date}
                onChange={(e) => handleChange('project_finish_date', e.target.value)}
              />
            </FormField>

            <FormField label="Planned RFP Release">
              <input
                type="date"
                className="form-input"
                value={formData.planned_rfp_release_date}
                onChange={(e) => handleChange('planned_rfp_release_date', e.target.value)}
              />
            </FormField>

            <FormField label="Actual RFP Release">
              <input
                type="date"
                className="form-input"
                value={formData.actual_rfp_release_date}
                onChange={(e) => handleChange('actual_rfp_release_date', e.target.value)}
              />
            </FormField>

            <FormField label="Planned Proposal Submission">
              <input
                type="date"
                className="form-input"
                value={formData.planned_proposal_submission_date}
                onChange={(e) => handleChange('planned_proposal_submission_date', e.target.value)}
              />
            </FormField>

            <FormField label="Actual Proposal Submission">
              <input
                type="date"
                className="form-input"
                value={formData.actual_proposal_submission_date}
                onChange={(e) => handleChange('actual_proposal_submission_date', e.target.value)}
              />
            </FormField>
          </FormGrid>
        </CollapsibleSection>

        {/* Sales & Procurement */}
        <CollapsibleSection
          title="Contract Information"
          isOpen={sections.sales}
          onToggle={() => toggleSection('sales')}
        >
          <FormGrid>
            <FormField label="Acquisition Type">
              <select
                className="form-select"
                value={formData.acquisition_type}
                onChange={(e) => handleChange('acquisition_type', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Full and Open">Full and Open</option>
                <option value="Set-Aside">Set-Aside</option>
                <option value="8(a)">8(a)</option>
                <option value="SDVOSB">SDVOSB</option>
                <option value="HUBZone">HUBZone</option>
                <option value="WOSB">WOSB</option>
              </select>
            </FormField>

            <FormField label="Contract Type">
              <select
                className="form-select"
                value={formData.contract_type}
                onChange={(e) => handleChange('contract_type', e.target.value)}
              >
                <option value="">Select Contract Type</option>
                <option value="FFP">Firm Fixed Price (FFP)</option>
                <option value="T&M">Time & Materials (T&M)</option>
                <option value="CPFF">Cost Plus Fixed Fee (CPFF)</option>
                <option value="CPAF">Cost Plus Award Fee (CPAF)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="TBD">To Be Determined</option>
              </select>
            </FormField>

            <FormField label="Solicitation Number">
              <input
                type="text"
                className="form-input"
                value={formData.solicitation_number}
                onChange={(e) => handleChange('solicitation_number', e.target.value)}
                placeholder="e.g., N00178-24-R-1234"
              />
            </FormField>

            <FormField label="GovWin ID">
              <input
                type="text"
                className="form-input"
                value={formData.govwin_id}
                onChange={(e) => handleChange('govwin_id', e.target.value)}
                placeholder="GovWin tracking ID"
              />
            </FormField>

            <FormField label="Opportunity Link">
              <input
                type="url"
                className="form-input"
                value={formData.opportunity_link}
                onChange={(e) => handleChange('opportunity_link', e.target.value)}
                placeholder="https://"
              />
            </FormField>

            <FormField label="Response Folder">
              <input
                type="url"
                className="form-input"
                value={formData.response_folder}
                onChange={(e) => handleChange('response_folder', e.target.value)}
                placeholder="SharePoint or folder link"
              />
            </FormField>

            <FormField label="B&P Code">
              <input
                type="text"
                className="form-input"
                value={formData.b_p_code}
                onChange={(e) => handleChange('b_p_code', e.target.value)}
                placeholder="Bid & Proposal code"
              />
            </FormField>

            <FormField label="CostPoint Project Code">
              <input
                type="text"
                className="form-input"
                value={formData.costpoint_project_code}
                onChange={(e) => handleChange('costpoint_project_code', e.target.value)}
              />
            </FormField>
          </FormGrid>

          <div style={{ marginTop: '20px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                className="form-checkbox"
                checked={formData.direct_award}
                onChange={(e) => handleChange('direct_award', e.target.checked)}
              />
              <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Direct Award</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                className="form-checkbox"
                checked={formData.front_door}
                onChange={(e) => handleChange('front_door', e.target.checked)}
              />
              <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Front Door</span>
            </label>
          </div>
        </CollapsibleSection>

        {/* Technical & Solution */}
        <CollapsibleSection
          title="Technical & Solution"
          isOpen={sections.technical}
          onToggle={() => toggleSection('technical')}
        >
          <FormGrid>
            <FormField label="Primary Business Line">
              <select
                className="form-select"
                value={formData.primary_business_line}
                onChange={(e) => handleChange('primary_business_line', e.target.value)}
              >
                <option value="">Select Business Line</option>
                <option value="Technology Services">Technology Services</option>
                <option value="Engineering Services">Engineering Services</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Mission Support">Mission Support</option>
              </select>
            </FormField>

            <FormField label="Primary NAICS Code">
              <input
                type="text"
                className="form-input"
                value={formData.primary_naics_code}
                onChange={(e) => handleChange('primary_naics_code', e.target.value)}
                placeholder="e.g., 541611"
              />
            </FormField>

            <FormField label="Solution Type">
              <select
                className="form-select"
                value={formData.solution}
                onChange={(e) => handleChange('solution', e.target.value)}
              >
                <option value="">Select Solution</option>
                <option value="Software Development">Software Development</option>
                <option value="IT Infrastructure">IT Infrastructure</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Cloud Services">Cloud Services</option>
                <option value="Systems Engineering">Systems Engineering</option>
              </select>
            </FormField>

            <FormField label="Forecast Group">
              <select
                className="form-select"
                value={formData.forecastGroupId}
                onChange={(e) => handleChange('forecastGroupId', e.target.value)}
              >
                <option value="">Select Forecast Group</option>
                {forecastGroups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </FormField>
          </FormGrid>

          <div style={{ marginTop: '20px' }}>
            <FormGrid columns={1}>
              <FormField label="Solution Details" help="Describe the technical solution">
                <textarea
                  className="form-textarea"
                  value={formData.solution_details}
                  onChange={(e) => handleChange('solution_details', e.target.value)}
                  rows="4"
                  placeholder="Detailed description of the technical approach and solution..."
                />
              </FormField>

              <FormField label="Key Personnel" help="Key team members for this opportunity">
                <textarea
                  className="form-textarea"
                  value={formData.key_personnel}
                  onChange={(e) => handleChange('key_personnel', e.target.value)}
                  rows="3"
                  placeholder="List key personnel and their roles..."
                />
              </FormField>
            </FormGrid>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
              Analysis & Due Diligence
            </h4>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.budget_confirmed}
                  onChange={(e) => handleChange('budget_confirmed', e.target.checked)}
                />
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Budget Confirmed</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.discovery_completed}
                  onChange={(e) => handleChange('discovery_completed', e.target.checked)}
                />
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Discovery Completed</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.roi_analysis_completed}
                  onChange={(e) => handleChange('roi_analysis_completed', e.target.checked)}
                />
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>ROI Analysis Completed</span>
              </label>
            </div>
          </div>
        </CollapsibleSection>

        {/* Competition & Teaming */}
        <CollapsibleSection
          title="Competitive Information"
          isOpen={sections.additional}
          onToggle={() => toggleSection('additional')}
        >
          <FormGrid>
            <FormField label="Bidding Entity">
              <input
                type="text"
                className="form-input"
                value={formData.bidding_entity}
                onChange={(e) => handleChange('bidding_entity', e.target.value)}
                placeholder="Lead bidding entity"
              />
            </FormField>

            <FormField label="Bidding Entity Role">
              <select
                className="form-select"
                value={formData.bidding_entity_role}
                onChange={(e) => handleChange('bidding_entity_role', e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Prime">Prime</option>
                <option value="Subcontractor">Subcontractor</option>
                <option value="Teaming Partner">Teaming Partner</option>
              </select>
            </FormField>

            <FormField label="Teaming Strategy">
              <select
                className="form-select"
                value={formData.teaming}
                onChange={(e) => handleChange('teaming', e.target.value)}
              >
                <option value="">Select Strategy</option>
                <option value="Prime">Prime (No Teaming)</option>
                <option value="Prime with Subs">Prime with Subcontractors</option>
                <option value="Subcontractor">Subcontractor to Prime</option>
                <option value="Joint Venture">Joint Venture</option>
              </select>
            </FormField>

            <FormField label="Incumbent">
              <input
                type="text"
                className="form-input"
                value={formData.incumbent}
                onChange={(e) => handleChange('incumbent', e.target.value)}
                placeholder="Current incumbent contractor"
              />
            </FormField>

            <FormField label="Incumbent Award Date">
              <input
                type="date"
                className="form-input"
                value={formData.incumbent_award_date}
                onChange={(e) => handleChange('incumbent_award_date', e.target.value)}
              />
            </FormField>

            <FormField label="Incumbent Expire Date">
              <input
                type="date"
                className="form-input"
                value={formData.incumbent_expire_date}
                onChange={(e) => handleChange('incumbent_expire_date', e.target.value)}
              />
            </FormField>

            <FormField label="DB Competitor">
              <input
                type="text"
                className="form-input"
                value={formData.db_competitor}
                onChange={(e) => handleChange('db_competitor', e.target.value)}
                placeholder="Known competitor"
              />
            </FormField>

            <FormField label="Winning Competitor" help="If lost, who won?">
              <input
                type="text"
                className="form-input"
                value={formData.winning_competitor}
                onChange={(e) => handleChange('winning_competitor', e.target.value)}
              />
            </FormField>

            <FormField label="Winning Price ($)" help="If lost, winning price">
              <input
                type="number"
                className="form-input"
                value={formData.winning_price}
                onChange={(e) => handleChange('winning_price', e.target.value)}
              />
            </FormField>
          </FormGrid>

          <div style={{ marginTop: '20px' }}>
            <FormGrid columns={1}>
              <FormField label="Teaming Notes">
                <textarea
                  className="form-textarea"
                  value={formData.teaming_notes}
                  onChange={(e) => handleChange('teaming_notes', e.target.value)}
                  rows="3"
                  placeholder="Details about teaming arrangements and partners..."
                />
              </FormField>

              <FormField label="Risk Assessment">
                <select
                  className="form-select"
                  value={formData.risk}
                  onChange={(e) => handleChange('risk', e.target.value)}
                >
                  <option value="">Select Risk Level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </FormField>

              <FormField label="Risk Notes">
                <textarea
                  className="form-textarea"
                  value={formData.risk_notes}
                  onChange={(e) => handleChange('risk_notes', e.target.value)}
                  rows="3"
                  placeholder="Describe key risks and mitigation strategies..."
                />
              </FormField>
            </FormGrid>
          </div>
        </CollapsibleSection>

        {/* Description & Notes */}
        <CollapsibleSection
          title="Description & Notes"
          isOpen={sections.notes}
          onToggle={() => toggleSection('notes')}
        >
          <FormGrid columns={1}>
            <FormField label="Description" help="Comprehensive opportunity description">
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="5"
                placeholder="Detailed description of the opportunity, requirements, scope of work..."
              />
            </FormField>

            <FormField label="Internal Notes">
              <textarea
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows="4"
                placeholder="Internal notes and observations..."
              />
            </FormField>

            <FormField label="Proposal Comments">
              <textarea
                className="form-textarea"
                value={formData.proposal_comments}
                onChange={(e) => handleChange('proposal_comments', e.target.value)}
                rows="3"
                placeholder="Comments about the proposal process..."
              />
            </FormField>

            <FormField label="Customer Debrief">
              <textarea
                className="form-textarea"
                value={formData.customer_debrief}
                onChange={(e) => handleChange('customer_debrief', e.target.value)}
                rows="4"
                placeholder="Customer feedback and debrief notes..."
              />
            </FormField>
          </FormGrid>
        </CollapsibleSection>

        {/* Sticky Footer */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          background: 'linear-gradient(to top, rgba(255,255,255,1) 80%, rgba(255,255,255,0))',
          padding: '24px 0',
          marginTop: '32px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
          borderTop: '1px solid #e5e7eb',
          zIndex: 10
        }}>
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #0B3D91 0%, #00A3A3 100%)',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
          >
            <Save style={{ width: '16px', height: '16px' }} />
            {isEditing ? 'Save Changes' : 'Create Opportunity'}
          </button>
        </div>
      </form>
    </div>
  );
};

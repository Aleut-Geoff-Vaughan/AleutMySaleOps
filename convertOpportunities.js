const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file
const workbook = XLSX.readFile('Opportunity.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// Helper function to convert Excel date serial number to YYYY-MM-DD
function excelDateToJS(serial) {
  if (!serial || serial === 0) return '';
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  const year = date_info.getFullYear();
  const month = String(date_info.getMonth() + 1).padStart(2, '0');
  const day = String(date_info.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Map stage names from Salesforce to your app's stages
const stageMapping = {
  'Prospecting': 'Prospecting',
  'Qualification': 'Qualification',
  'Needs Analysis': 'Qualification',
  'Value Proposition': 'Proposal',
  'Id. Decision Makers': 'Qualification',
  'Perception Analysis': 'Proposal',
  'Proposal/Price Quote': 'Proposal',
  'Negotiation/Review': 'Negotiation',
  'Closed Won': 'Closed Won',
  'Closed Lost': 'Closed Lost',
  'No-Bid': 'Closed Lost',
  'Closed-No Bid': 'Closed Lost',
  'On-Hold': 'Qualification',
};

// Filter for valid, active opportunities (not deleted, has amount, has name)
const validOpps = data.filter(opp =>
  !opp.IsDeleted &&
  opp.Name &&
  opp.Amount > 0 &&
  opp.StageName
);

console.log(`Found ${validOpps.length} valid opportunities`);

// Take first 50 and convert to app format
const convertedOpportunities = validOpps.slice(0, 50).map((opp, index) => {
  const stage = stageMapping[opp.StageName] || 'Prospecting';

  return {
    id: index + 100, // Start IDs at 100 to avoid conflicts
    opportunity_name: opp.Name,
    agency_id: 1, // Default to first agency, can be randomized
    primary_contact_id: 1, // Default to first contact
    value: Math.round(opp.Amount) || 0, // Amount is already in dollars
    stage: stage,
    probability: opp.Probability || 0,
    close_date: excelDateToJS(opp.CloseDate),
    entityId: 1, // Default entity
    forecastGroupId: (index % 4) + 1, // Distribute across 4 forecast groups
    capabilities: [], // Will need to add capabilities separately

    // Additional fields from Salesforce
    opportunity_status: opp.Opportunity_Status__c || 'Active',
    priority: opp.Priority__c || 'Medium',
    description: opp.Description || '',
    total_contract_value: Math.round(opp.Amount) || 0,
    expected_revenue: Math.round(opp.ExpectedRevenue || 0),
    p_go: opp.PGo__c || 0,
    forecast_category: opp.ForecastCategory || '',
    included_in_forecast: opp.Included_in_Forecast__c === 1,
    project_start_date: excelDateToJS(opp.Project_NTP_Start_Date__c),
    planned_rfp_release_date: excelDateToJS(opp.Planned_RFP_Release_Date__c),
    planned_proposal_submission_date: excelDateToJS(opp.Planned_Proposal_Submission_Date__c),
    contract_type: opp.Contract_Type__c || 'TBD',
    solicitation_number: opp.Solicitation_Number__c || '',
    acquisition_type: opp.Acquisition_Type__c || '',
    duration: opp.Duration__c || '',
    budget_confirmed: opp.Budget_Confirmed__c === 1,
    discovery_completed: opp.Discovery_Completed__c === 1,
    roi_analysis_completed: opp.ROI_Analysis_Completed__c === 1,
    primary_business_line: opp.Primary_Business_Line__c || '',
    primary_naics_code: opp.Primary_NAICS_Code__c || '',
    opportunity_link: opp.Opportunity_Link__c || '',
    govwin_id: opp.GovWin_ID__c ? String(opp.GovWin_ID__c) : '',
    notes: ''
  };
});

// Save as JavaScript array that can be copied into your app
const jsOutput = `// Generated from Salesforce Opportunity.xlsx
// ${convertedOpportunities.length} opportunities

const opportunities = ${JSON.stringify(convertedOpportunities, null, 2)};

export default opportunities;
`;

fs.writeFileSync('opportunities_converted.js', jsOutput);

console.log(`\nSuccessfully converted ${convertedOpportunities.length} opportunities!`);
console.log('Output saved to: opportunities_converted.js');
console.log('\nSample opportunities:');
console.log('- ' + convertedOpportunities.slice(0, 5).map(o => {
  const valueMil = o.value / 1000000;
  return `${o.opportunity_name} ($${valueMil.toFixed(2)}M) - ${o.stage}`;
}).join('\n- '));

// Also save as JSON for easier inspection
fs.writeFileSync('opportunities_converted.json', JSON.stringify(convertedOpportunities, null, 2));
console.log('\nAlso saved as JSON: opportunities_converted.json');

// Data helper functions

export const getAgencyName = (id, agencies) =>
  agencies.find(a => a.id === id)?.name || 'Unknown';

export const getContactName = (id, contacts) => {
  const contact = contacts.find(c => c.id === id);
  return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
};

export const getEntityName = (id, entities) =>
  entities.find(e => e.id === id)?.name || 'Unknown';

export const getForecastGroupName = (id, forecastGroups) =>
  forecastGroups.find(g => g.id === id)?.name || 'Unknown';

export const getAgencyContacts = (agencyId, contacts) =>
  contacts.filter(c => c.agencyId === agencyId);

export const calculateStats = (opportunities) => {
  const total = opportunities.reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
  const weighted = opportunities
    .filter(opp => !opp.stage.includes('Closed'))
    .reduce((sum, opp) => sum + ((Number(opp.value) || 0) * (Number(opp.probability) || 0) / 100), 0);
  const active = opportunities.filter(opp => !opp.stage.includes('Closed')).length;
  const won = opportunities.filter(opp => opp.stage === 'Closed Won').length;
  return { total, weighted, active, won };
};

export const calculateEntityStats = (entityId, opportunities) => {
  const entityOpps = opportunities.filter(o => o.entityId === entityId);
  const total = entityOpps.reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
  const won = entityOpps.filter(o => o.stage === 'Closed Won').reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
  const pipeline = entityOpps.filter(o => !o.stage.includes('Closed')).reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
  return { total, won, pipeline, count: entityOpps.length };
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

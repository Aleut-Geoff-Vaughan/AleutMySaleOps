import { useMemo, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';

export const useOpportunities = () => {
  const { opportunities, setOpportunities, agencies, contacts, entities, forecastGroups } = useApp();

  const getAgencyName = useCallback((id) => {
    return agencies.find(a => a.id === id)?.name || 'Unknown';
  }, [agencies]);

  const getContactName = useCallback((id) => {
    const contact = contacts.find(c => c.id === id);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
  }, [contacts]);

  const getEntityName = useCallback((id) => {
    return entities.find(e => e.id === id)?.name || 'Unknown';
  }, [entities]);

  const getForecastGroupName = useCallback((id) => {
    return forecastGroups.find(g => g.id === id)?.name || 'Unknown';
  }, [forecastGroups]);

  const calculateStats = useMemo(() => {
    const total = opportunities.reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    const weighted = opportunities
      .filter(opp => !opp.stage.includes('Closed'))
      .reduce((sum, opp) => sum + ((Number(opp.value) || 0) * (Number(opp.probability) || 0) / 100), 0);
    const active = opportunities.filter(opp => !opp.stage.includes('Closed')).length;
    const won = opportunities.filter(opp => opp.stage === 'Closed Won').length;
    return { total, weighted, active, won };
  }, [opportunities]);

  const addOpportunity = useCallback((opportunity) => {
    const newId = Math.max(0, ...opportunities.map(o => o.id)) + 1;
    setOpportunities([...opportunities, { ...opportunity, id: newId }]);
  }, [opportunities, setOpportunities]);

  const updateOpportunity = useCallback((id, updates) => {
    setOpportunities(opportunities.map(opp =>
      opp.id === id ? { ...opp, ...updates } : opp
    ));
  }, [opportunities, setOpportunities]);

  const deleteOpportunity = useCallback((id) => {
    setOpportunities(opportunities.filter(opp => opp.id !== id));
  }, [opportunities, setOpportunities]);

  const filterOpportunities = useCallback((searchTerm, stageFilter) => {
    return opportunities.filter(opp => {
      const matchesSearch = !searchTerm ||
        opp.opportunity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAgencyName(opp.agency_id).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = !stageFilter || opp.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [opportunities, getAgencyName]);

  const sortOpportunities = useCallback((opps, sortBy, sortOrder) => {
    return [...opps].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'agency_id') {
        aVal = getAgencyName(a.agency_id);
        bVal = getAgencyName(b.agency_id);
      }

      if (typeof aVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [getAgencyName]);

  return {
    opportunities,
    calculateStats,
    getAgencyName,
    getContactName,
    getEntityName,
    getForecastGroupName,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    filterOpportunities,
    sortOpportunities
  };
};

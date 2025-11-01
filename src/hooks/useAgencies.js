import { useCallback, useMemo } from 'react';
import { useApp as useAppContext } from '../contexts/AppContext';

export const useAgencies = () => {
  const { agencies, setAgencies, contacts } = useAppContext();

  const getAgencyContacts = useCallback((agencyId) => {
    return contacts.filter(c => c.agencyId === agencyId);
  }, [contacts]);

  const agenciesWithContacts = useMemo(() => {
    return agencies.map(agency => ({
      ...agency,
      contacts: getAgencyContacts(agency.id)
    }));
  }, [agencies, getAgencyContacts]);

  const addAgency = useCallback((agency) => {
    const newId = Math.max(0, ...agencies.map(a => a.id)) + 1;
    setAgencies([...agencies, { ...agency, id: newId }]);
  }, [agencies, setAgencies]);

  const updateAgency = useCallback((id, updates) => {
    setAgencies(agencies.map(agency =>
      agency.id === id ? { ...agency, ...updates } : agency
    ));
  }, [agencies, setAgencies]);

  const deleteAgency = useCallback((id) => {
    setAgencies(agencies.filter(agency => agency.id !== id));
  }, [agencies, setAgencies]);

  return {
    agencies,
    agenciesWithContacts,
    getAgencyContacts,
    addAgency,
    updateAgency,
    deleteAgency
  };
};

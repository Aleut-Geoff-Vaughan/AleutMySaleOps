import { useCallback } from 'react';
import { useApp as useAppContext } from '../contexts/AppContext';

export const useContacts = () => {
  const { contacts, setContacts, agencies } = useAppContext();

  const getAgencyName = useCallback((agencyId) => {
    return agencies.find(a => a.id === agencyId)?.name || 'Unknown';
  }, [agencies]);

  const addContact = useCallback((contact) => {
    const newId = Math.max(0, ...contacts.map(c => c.id)) + 1;
    setContacts([...contacts, { ...contact, id: newId }]);
  }, [contacts, setContacts]);

  const updateContact = useCallback((id, updates) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  }, [contacts, setContacts]);

  const deleteContact = useCallback((id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  }, [contacts, setContacts]);

  return {
    contacts,
    getAgencyName,
    addContact,
    updateContact,
    deleteContact
  };
};

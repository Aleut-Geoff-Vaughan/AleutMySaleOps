import { useCallback, useMemo } from 'react';
import { useApp as useAppContext } from '../contexts/AppContext';

export const useContractVehicles = () => {
  const { contractVehicles, setContractVehicles, agencies, opportunities } = useAppContext();

  const getAgencyName = useCallback((agencyId) => {
    return agencies.find(a => a.id === agencyId)?.name || 'Unknown';
  }, [agencies]);

  const getRelatedOpportunities = useCallback((vehicleId) => {
    return opportunities.filter(opp => opp.contractVehicleId === vehicleId);
  }, [opportunities]);

  const contractVehiclesWithDetails = useMemo(() => {
    return contractVehicles.map(vehicle => ({
      ...vehicle,
      agencyName: getAgencyName(vehicle.agency_id),
      relatedOpportunities: getRelatedOpportunities(vehicle.id),
      opportunityCount: getRelatedOpportunities(vehicle.id).length
    }));
  }, [contractVehicles, getAgencyName, getRelatedOpportunities]);

  const addContractVehicle = useCallback((vehicle) => {
    const newId = Math.max(0, ...contractVehicles.map(v => v.id)) + 1;
    setContractVehicles([...contractVehicles, { ...vehicle, id: newId }]);
  }, [contractVehicles, setContractVehicles]);

  const updateContractVehicle = useCallback((id, updates) => {
    setContractVehicles(contractVehicles.map(vehicle =>
      vehicle.id === id ? { ...vehicle, ...updates } : vehicle
    ));
  }, [contractVehicles, setContractVehicles]);

  const deleteContractVehicle = useCallback((id) => {
    setContractVehicles(contractVehicles.filter(vehicle => vehicle.id !== id));
  }, [contractVehicles, setContractVehicles]);

  return {
    contractVehicles,
    contractVehiclesWithDetails,
    getAgencyName,
    getRelatedOpportunities,
    addContractVehicle,
    updateContractVehicle,
    deleteContractVehicle
  };
};

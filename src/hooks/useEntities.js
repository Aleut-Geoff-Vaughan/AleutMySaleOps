import { useMemo, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';

export const useEntities = () => {
  const { entities, setEntities, opportunities } = useApp();

  const calculateEntityStats = useCallback((entityId) => {
    const entityOpps = opportunities.filter(o => o.entityId === entityId);
    const total = entityOpps.reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    const won = entityOpps
      .filter(o => o.stage === 'Closed Won')
      .reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    const pipeline = entityOpps
      .filter(o => !o.stage.includes('Closed'))
      .reduce((sum, opp) => sum + (Number(opp.value) || 0), 0);
    return { total, won, pipeline, count: entityOpps.length };
  }, [opportunities]);

  const entitiesWithStats = useMemo(() => {
    return entities.map(entity => ({
      ...entity,
      stats: calculateEntityStats(entity.id)
    }));
  }, [entities, calculateEntityStats]);

  const addEntity = useCallback((entity) => {
    const newId = Math.max(0, ...entities.map(e => e.id)) + 1;
    setEntities([...entities, { ...entity, id: newId, documents: [] }]);
  }, [entities, setEntities]);

  const updateEntity = useCallback((id, updates) => {
    setEntities(entities.map(entity =>
      entity.id === id ? { ...entity, ...updates } : entity
    ));
  }, [entities, setEntities]);

  const deleteEntity = useCallback((id) => {
    setEntities(entities.filter(entity => entity.id !== id));
  }, [entities, setEntities]);

  const addDocument = useCallback((entityId, document) => {
    setEntities(entities.map(entity => {
      if (entity.id === entityId) {
        const newDocId = Math.max(0, ...entity.documents.map(d => d.id)) + 1;
        return {
          ...entity,
          documents: [...entity.documents, { ...document, id: newDocId }]
        };
      }
      return entity;
    }));
  }, [entities, setEntities]);

  const deleteDocument = useCallback((entityId, documentId) => {
    setEntities(entities.map(entity => {
      if (entity.id === entityId) {
        return {
          ...entity,
          documents: entity.documents.filter(d => d.id !== documentId)
        };
      }
      return entity;
    }));
  }, [entities, setEntities]);

  return {
    entities,
    entitiesWithStats,
    calculateEntityStats,
    addEntity,
    updateEntity,
    deleteEntity,
    addDocument,
    deleteDocument
  };
};

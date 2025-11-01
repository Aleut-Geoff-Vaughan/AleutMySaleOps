import { useCallback, useMemo } from 'react';
import { useApp as useAppContext } from '../contexts/AppContext';

export const useForecasts = () => {
  const { forecasts, setForecasts, forecastGroups } = useAppContext();

  const getForecastGroupName = useCallback((id) => {
    return forecastGroups.find(g => g.id === id)?.name || 'Unknown';
  }, [forecastGroups]);

  const calculateTotals = useMemo(() => {
    if (!forecasts.length) return { target: 0, actual: 0, pipeline: 0 };

    const currentForecast = forecasts[0];
    return currentForecast.groups.reduce((acc, group) => ({
      target: acc.target + group.target,
      actual: acc.actual + group.actual,
      pipeline: acc.pipeline + group.pipeline
    }), { target: 0, actual: 0, pipeline: 0 });
  }, [forecasts]);

  const addForecast = useCallback((forecast) => {
    const newId = Math.max(0, ...forecasts.map(f => f.id)) + 1;
    setForecasts([...forecasts, { ...forecast, id: newId }]);
  }, [forecasts, setForecasts]);

  const updateForecast = useCallback((id, updates) => {
    setForecasts(forecasts.map(forecast =>
      forecast.id === id ? { ...forecast, ...updates } : forecast
    ));
  }, [forecasts, setForecasts]);

  const deleteForecast = useCallback((id) => {
    setForecasts(forecasts.filter(forecast => forecast.id !== id));
  }, [forecasts, setForecasts]);

  return {
    forecasts,
    calculateTotals,
    getForecastGroupName,
    addForecast,
    updateForecast,
    deleteForecast
  };
};

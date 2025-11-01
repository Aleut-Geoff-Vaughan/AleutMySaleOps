import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { OpportunityFormPage } from './pages/OpportunityFormPage';
import { AgenciesPage } from './pages/AgenciesPage';
import { AgencyFormPage } from './pages/AgencyFormPage';
import { ContactFormPage } from './pages/ContactFormPage';
import { ContractVehiclesPage } from './pages/ContractVehiclesPage';
import { ContractVehicleFormPage } from './pages/ContractVehicleFormPage';
import { EntitiesPage } from './pages/EntitiesPage';
import { ForecastsPage } from './pages/ForecastsPage';
import { ReportingPage } from './pages/ReportingPage';
import { ConfigurationPage } from './pages/ConfigurationPage';

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="opportunities" element={<OpportunitiesPage />} />
                <Route path="opportunities/new" element={<OpportunityFormPage />} />
                <Route path="opportunities/:id/edit" element={<OpportunityFormPage />} />
                <Route path="agencies" element={<AgenciesPage />} />
                <Route path="agencies/new" element={<AgencyFormPage />} />
                <Route path="agencies/:id/edit" element={<AgencyFormPage />} />
                <Route path="contacts/new" element={<ContactFormPage />} />
                <Route path="contacts/:id/edit" element={<ContactFormPage />} />
                <Route path="contract-vehicles" element={<ContractVehiclesPage />} />
                <Route path="contract-vehicles/new" element={<ContractVehicleFormPage />} />
                <Route path="contract-vehicles/:id/edit" element={<ContractVehicleFormPage />} />
                <Route path="entities" element={<EntitiesPage />} />
                <Route path="forecasts" element={<ForecastsPage />} />
                <Route path="reporting" element={<ReportingPage />} />
                <Route
                  path="configuration"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <ConfigurationPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;

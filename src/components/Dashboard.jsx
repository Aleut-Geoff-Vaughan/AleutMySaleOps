import React from 'react';
import { TrendingUp, Building2, Target, BarChart3, Settings, Users } from 'lucide-react';
import StatsPanel from './StatsPanel';
import OpportunityList from './OpportunityList';
import Section from './Section';

const Tile = ({ icon: Icon, title, subtitle, count, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transform transition duration-200 ease-out hover:scale-105 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-lg tile-icon flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
    {typeof count !== 'undefined' && <div className="text-sm text-gray-600">{count}</div>}
  </button>
);

const Dashboard = ({ stats = {}, opportunities = [], entities = [], forecasts = [], powerBIReports = [], users = [], userRole = '', setActiveView = () => {}, getAgencyName, getContactName, openForm, handleDelete }) => {
  return (
    <div className="space-y-6">
      <Section title="Overview" sectionKey="overview" expandedSections={{overview:true}} toggleSection={() => {}}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Tile icon={TrendingUp} title="Sales Management" subtitle="Opportunities & Pipeline" count={opportunities.length} onClick={() => setActiveView('sales')} />
          <Tile icon={Building2} title="Entity Management" subtitle="LLCs & Docs" count={entities.length} onClick={() => setActiveView('entities')} />
          <Tile icon={Target} title="Forecasts" subtitle="Targets & Performance" count={forecasts[0]?.fiscalYear || 'N/A'} onClick={() => setActiveView('forecasts')} />
          <Tile icon={BarChart3} title="Reporting" subtitle="Power BI Dashboards" count={powerBIReports.length} onClick={() => setActiveView('reporting')} />
          {userRole === 'admin' && <Tile icon={Settings} title="Configuration" subtitle="System Settings" count={users.length} onClick={() => setActiveView('configuration')} />}
          <Tile icon={Users} title="Users" subtitle="Manage users" count={users.length} onClick={() => setActiveView('users')} />
        </div>
      </Section>

      <Section title="Performance" sectionKey="stats" expandedSections={{stats:true}} toggleSection={() => {}}>
        <StatsPanel stats={stats} />
      </Section>

      <Section title="Recent Opportunities" sectionKey="opps" expandedSections={{opps:true}} toggleSection={() => {}}>
        <OpportunityList
          opportunities={opportunities}
          getAgencyName={getAgencyName}
          getContactName={getContactName}
          openForm={openForm}
          handleDelete={handleDelete}
        />
      </Section>
    </div>
  );
};

export default Dashboard;

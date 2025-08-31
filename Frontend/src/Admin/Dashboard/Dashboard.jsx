

import React from 'react';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <DashboardStats />
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
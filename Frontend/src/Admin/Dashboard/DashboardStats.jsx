

import React from 'react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-2xl">1,234</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold">Total Events</h3>
        <p className="text-2xl">567</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold">Revenue</h3>
        <p className="text-2xl">$12,345</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold">Active Organizers</h3>
        <p className="text-2xl">42</p>
      </div>
    </div>
  );
};

export default DashboardStats;
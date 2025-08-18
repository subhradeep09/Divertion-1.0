

import React from 'react';

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">User Growth</h3>
        <div className="h-48 flex items-center justify-center text-gray-400">
          [User Growth Chart Placeholder]
        </div>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Revenue Trends</h3>
        <div className="h-48 flex items-center justify-center text-gray-400">
          [Revenue Chart Placeholder]
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
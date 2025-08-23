import React from 'react';
import RevenueReport from './RevenueReport';
import EngagementReport from './EngagementReport';
import ExportReportButton from './ExportReportButton';

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 mt-20">
          <h1 className="text-3xl font-bold mb-2 text-pink-400">Analytics Dashboard</h1>
          <p className="text-gray-400">Track and analyze your business performance</p>
        </header>
        
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <RevenueReport />
          <EngagementReport />
        </div>
        
        <div className="flex space-x-4">
          <ExportReportButton reportType="Revenue" />
          <ExportReportButton reportType="Engagement" />
        </div>
      </div>
    </div>
  );
};

export default Reports;
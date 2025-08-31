

import React from 'react';
import RevenueReport from './RevenueReport';
import EngagementReport from './EngagementReport';
import ExportReportButton from './ExportReportButton';

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="flex justify-between items-center">
        <RevenueReport />
        <EngagementReport />
      </div>
      <div>
        <ExportReportButton reportType="Revenue" />
        <ExportReportButton reportType="Engagement" className="ml-4" />
      </div>
    </div>
  );
};

export default Reports;
import React from 'react';

const ExportReportButton = ({ reportType }) => {
  const handleExport = () => {
    alert(`Exporting ${reportType} report...`);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
    >
      Export {reportType} Report
    </button>
  );
};

export default ExportReportButton;
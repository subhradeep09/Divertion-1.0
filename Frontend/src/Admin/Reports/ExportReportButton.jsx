import React from 'react';

const ExportReportButton = ({ reportType, className = '' }) => {
  const handleExport = () => {
    alert(`Exporting ${reportType} report...`);
  };

  return (
    <button
      onClick={handleExport}
      className={`bg-pink-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-pink-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-pink-500/20 flex items-center ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export {reportType} Report
    </button>
  );
};

export default ExportReportButton;
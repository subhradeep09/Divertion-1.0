import React from 'react';
import adminAxios from '../../utils/adminAxios';
import { showSuccess, showError } from '../../utils/toaster';

const ExportReportButton = ({ reportType, className = '' }) => {
  const handleExport = async () => {
    try {
      let endpoint;
      let filename;
      
      switch (reportType) {
        case 'Revenue':
          // You might need to create this endpoint
          endpoint = '/admin/export/revenue';
          filename = 'revenue-report.csv';
          break;
        case 'Engagement':
          endpoint = '/admin/export/users';
          filename = 'engagement-report.csv';
          break;
        case 'Events':
          endpoint = '/admin/export/events';
          filename = 'events-report.csv';
          break;
        default:
          endpoint = '/admin/export/users';
          filename = 'report.csv';
      }

      const response = await adminAxios.get(endpoint, {
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      showSuccess(`${reportType} report exported successfully!`);

    } catch (error) {
      showError(`Failed to export ${reportType.toLowerCase()} report`);
      console.error('Export error:', error);
      
      // Fallback to alert if API endpoint doesn't exist yet
      alert(`Exporting ${reportType} report...\n\nNote: Export functionality requires backend implementation.`);
    }
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
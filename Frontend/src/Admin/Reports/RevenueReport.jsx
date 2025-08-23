import React from 'react';

const RevenueReport = () => {
  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-xl border border-pink-500/20 flex-1 mr-4">
      <h2 className="text-xl font-bold mb-4 text-pink-400">Revenue Report</h2>
      <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-pink-500/10">
        <div className="text-center">
          <div className="w-20 h-20 bg-pink-500 rounded-full mx-auto flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-pink-200">Revenue chart visualization</p>
          <p className="text-gray-400 text-sm mt-1">$24,589.00 total revenue</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
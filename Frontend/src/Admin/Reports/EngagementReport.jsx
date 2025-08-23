import React from 'react';

const EngagementReport = () => {
  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-xl border border-pink-500/20 flex-1">
      <h2 className="text-xl font-bold mb-4 text-pink-400">Engagement Report</h2>
      <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-pink-500/10">
        <div className="text-center">
          <div className="w-20 h-20 bg-pink-500 rounded-full mx-auto flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-pink-200">Engagement metrics</p>
          <p className="text-gray-400 text-sm mt-1">4,892 active users</p>
        </div>
      </div>
    </div>
  );
};

export default EngagementReport;
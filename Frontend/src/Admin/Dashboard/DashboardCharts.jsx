import React from 'react';
import { FiPieChart, FiBarChart2 } from 'react-icons/fi';

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* User Growth Chart */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-pink-900/50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <FiBarChart2 className="mr-2 text-pink-400" />
            User Growth
          </h3>
          <select className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 p-2">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="h-64 relative">
          {/* Chart bars */}
          <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between px-4">
            {[40, 60, 75, 55, 80, 65, 90].map((height, index) => (
              <div key={index} className="flex flex-col items-center w-8">
                <div 
                  className="w-6 bg-gradient-to-t from-pink-500 to-purple-600 rounded-t-lg"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
              </div>
            ))}
          </div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-gray-700"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Revenue Trends Chart */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-pink-900/50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <FiPieChart className="mr-2 text-pink-400" />
            Revenue Trends
          </h3>
          <select className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 p-2">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="h-64 relative flex items-center justify-center">
          {/* Doughnut chart */}
          <div className="relative w-40 h-40 rounded-full border-8 border-transparent"
               style={{
                 background: `conic-gradient(
                   #ec4899 0% 35%, 
                   #8b5cf6 35% 65%, 
                   #10b981 65% 100%
                 )`,
                 mask: `radial-gradient(transparent 60%, black 61%)`
               }}>
          </div>
          
          {/* Chart center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">$46.2K</span>
            <span className="text-xs text-gray-400">Total Revenue</span>
          </div>
          
          {/* Legend */}
          <div className="absolute right-4 top-8 space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              <span className="text-sm">Event Tickets</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm">Merchandise</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Sponsorships</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
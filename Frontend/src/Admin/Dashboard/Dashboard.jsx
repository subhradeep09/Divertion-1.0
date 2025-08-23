import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiUser, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 mt-20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your events.</p>
        </div>
        
        <DashboardStats />
        <DashboardCharts />
        
        {/* Recent Activity Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-pink-900/50 overflow-hidden">
          <div className="p-6 border-b border-pink-900/50">
            <h2 className="text-xl font-bold flex items-center">
              <FiTrendingUp className="mr-2 text-pink-400" />
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-800/30 rounded-lg border-l-4 border-pink-500">
                <div className="bg-pink-500/10 p-2 rounded-full mr-4">
                  <FiUser className="text-pink-400" />
                </div>
                <div>
                  <p className="font-medium">New organizer registered</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-800/30 rounded-lg border-l-4 border-purple-500">
                <div className="bg-purple-500/10 p-2 rounded-full mr-4">
                  <FiCalendar className="text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Music Festival event was approved</p>
                  <p className="text-sm text-gray-400">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-800/30 rounded-lg border-l-4 border-green-500">
                <div className="bg-green-500/10 p-2 rounded-full mr-4">
                  <FiDollarSign className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium">New ticket purchase for Tech Conference</p>
                  <p className="text-sm text-gray-400">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
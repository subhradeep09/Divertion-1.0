import React, { useState, useEffect } from 'react';
import adminAxios from '../../utils/adminAxios';
import { showError } from '../../utils/toaster';

const EngagementReport = () => {
  const [engagementData, setEngagementData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    organizers: 0,
    attendees: 0,
    loading: true
  });

  useEffect(() => {
    fetchEngagementData();
  }, []);

  const fetchEngagementData = async () => {
    try {
      const [attendeesRes, organizersRes] = await Promise.all([
        adminAxios.get('/events/all-Attendees'),
        adminAxios.get('/events/all-Organizers')
      ]);

      const attendees = attendeesRes.data.message || [];
      const organizers = organizersRes.data.message || [];
      const totalUsers = attendees.length + organizers.length;
      const activeUsers = attendees.filter(user => !user.isBanned).length + 
                         organizers.filter(user => !user.isBanned).length;

      setEngagementData({
        totalUsers,
        activeUsers,
        attendees: attendees.length,
        organizers: organizers.length,
        loading: false
      });

    } catch (error) {
      showError('Failed to fetch engagement data');
      console.error('Error fetching engagement data:', error);
      setEngagementData(prev => ({ ...prev, loading: false }));
    }
  };

  if (engagementData.loading) {
    return (
      <div className="p-6 bg-gray-900 text-white shadow-lg rounded-xl border border-pink-500/20 flex-1">
        <h2 className="text-xl font-bold mb-4 text-pink-400">Engagement Report</h2>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-pink-500/10">
          <div className="animate-pulse text-pink-500">Loading engagement data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-xl border border-pink-500/20 flex-1">
      <h2 className="text-xl font-bold mb-4 text-pink-400">Engagement Report</h2>
      <div className="h-64 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-pink-500/10 p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-pink-500 rounded-full mx-auto flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-pink-200 font-semibold">Active Users</p>
          <p className="text-2xl font-bold text-white mt-2">{engagementData.activeUsers.toLocaleString()}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-lg font-semibold text-purple-400">{engagementData.totalUsers}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Organizers</p>
            <p className="text-lg font-semibold text-blue-400">{engagementData.organizers}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Attendees</p>
            <p className="text-lg font-semibold text-green-400">{engagementData.attendees}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Banned Users</p>
            <p className="text-lg font-semibold text-red-400">{engagementData.totalUsers - engagementData.activeUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementReport;
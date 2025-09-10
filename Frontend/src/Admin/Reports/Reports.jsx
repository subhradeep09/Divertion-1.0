import React, { useState, useEffect } from 'react';
import RevenueReport from './RevenueReport';
import EngagementReport from './EngagementReport';
import ExportReportButton from './ExportReportButton';
import adminAxios from '../../utils/adminAxios';
import { showError } from '../../utils/toaster';

const Reports = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    pendingEvents: 0,
    approvedEvents: 0,
    loading: true
  });

  useEffect(() => {
    fetchEventStats();
  }, []);

  const fetchEventStats = async () => {
    try {
      const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
        adminAxios.get('/events/event-management'),
        adminAxios.get('/events/all-Approved-Events'),
        adminAxios.get('/events/all-Rejected-Events')
      ]);

      const pendingEvents = pendingRes.data.message?.length || 0;
      const approvedEvents = approvedRes.data.message?.length || 0;
      const rejectedEvents = rejectedRes.data.message?.length || 0;

      setStats({
        totalEvents: pendingEvents + approvedEvents + rejectedEvents,
        pendingEvents,
        approvedEvents,
        rejectedEvents,
        loading: false
      });

    } catch (error) {
      showError('Failed to fetch event statistics');
      console.error('Error fetching event stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 mt-20">
          <h1 className="text-3xl font-bold mb-2 text-pink-400">Analytics Dashboard</h1>
          <p className="text-gray-400">Track and analyze your business performance</p>
        </header>

        {/* Quick Stats */}
        {!stats.loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-pink-500/20 text-center">
              <p className="text-gray-400">Total Events</p>
              <p className="text-2xl font-bold text-pink-400">{stats.totalEvents}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/20 text-center">
              <p className="text-gray-400">Approved Events</p>
              <p className="text-2xl font-bold text-blue-400">{stats.approvedEvents}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/20 text-center">
              <p className="text-gray-400">Pending Events</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingEvents}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-red-500/20 text-center">
              <p className="text-gray-400">Rejected Events</p>
              <p className="text-2xl font-bold text-red-400">{stats.rejectedEvents}</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <RevenueReport />
          <EngagementReport />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <ExportReportButton reportType="Revenue" />
          <ExportReportButton reportType="Engagement" />
          <ExportReportButton reportType="Events" />
          <ExportReportButton reportType="Users" />
        </div>
      </div>
    </div>
  );
};

export default Reports;
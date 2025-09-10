import React, { useState, useEffect } from 'react';
import adminAxios from '../../utils/adminAxios';
import { showError } from '../../utils/toaster';

const RevenueReport = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    ticketSales: 0,
    activeEvents: 0,
    loading: true
  });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      // In a real implementation, you would have a revenue endpoint
      // For now, we'll calculate from approved events and their pricing
      const [eventsRes, bookingsRes] = await Promise.all([
        adminAxios.get('/events/all-Approved-Events'),
        adminAxios.get('/admin/bookings') // You might need to create this endpoint
      ]);

      const approvedEvents = eventsRes.data.message || [];
      
      // Calculate revenue (simplified - in real app, use actual booking data)
      const totalRevenue = approvedEvents.reduce((sum, event) => {
        return sum + ((event.ticketPrice || 0) * (event.totalRegisteredAttendees || 0));
      }, 0);

      const ticketSales = approvedEvents.reduce((sum, event) => {
        return sum + (event.totalRegisteredAttendees || 0);
      }, 0);

      setRevenueData({
        totalRevenue,
        ticketSales,
        activeEvents: approvedEvents.length,
        loading: false
      });

    } catch (error) {
      showError('Failed to fetch revenue data');
      console.error('Error fetching revenue data:', error);
      setRevenueData(prev => ({ ...prev, loading: false }));
    }
  };

  if (revenueData.loading) {
    return (
      <div className="p-6 bg-gray-900 text-white shadow-lg rounded-xl border border-pink-500/20 flex-1">
        <h2 className="text-xl font-bold mb-4 text-pink-400">Revenue Report</h2>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-pink-500/10">
          <div className="animate-pulse text-pink-500">Loading revenue data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-xl border border-pink-500/20 flex-1">
      <h2 className="text-xl font-bold mb-4 text-pink-400">Revenue Report</h2>
      <div className="h-64 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-pink-500/10 p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-pink-500 rounded-full mx-auto flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-pink-200 font-semibold">Total Revenue</p>
          <p className="text-2xl font-bold text-white mt-2">${revenueData.totalRevenue.toLocaleString()}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Ticket Sales</p>
            <p className="text-lg font-semibold text-green-400">{revenueData.ticketSales}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Active Events</p>
            <p className="text-lg font-semibold text-blue-400">{revenueData.activeEvents}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
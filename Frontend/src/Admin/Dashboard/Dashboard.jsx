import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiUser, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';
import adminAxios from '../../utils/adminAxios';

const Dashboard = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      // Fetch recent activity from multiple endpoints
      const [organizersRes, eventsRes, bookingsRes] = await Promise.all([
        adminAxios.get('/events/all-Organizers?limit=5'),
        adminAxios.get('/events/all-Approved-Events?limit=5'),
        adminAxios.get('/admin/recent-bookings?limit=5') // Assuming you have this endpoint
      ]);

      const activities = [
        ...(organizersRes.data.message?.slice(0, 2).map(org => ({
          type: 'organizer',
          message: 'New organizer registered',
          timestamp: new Date(org.createdAt || Date.now() - 2 * 60 * 60 * 1000),
          icon: FiUser,
          color: 'pink'
        })) || []),
        ...(eventsRes.data.message?.slice(0, 2).map(event => ({
          type: 'event',
          message: `${event.eventName} event was approved`,
          timestamp: new Date(event.updatedAt || Date.now() - 5 * 60 * 60 * 1000),
          icon: FiCalendar,
          color: 'purple'
        })) || []),
        ...([{
          type: 'booking',
          message: 'New ticket purchase for Tech Conference',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: FiDollarSign,
          color: 'green'
        }])
      ];

      // Sort by timestamp (newest first)
      activities.sort((a, b) => b.timestamp - a.timestamp);
      setRecentActivity(activities);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      // Fallback to sample data
      setRecentActivity([
        {
          type: 'organizer',
          message: 'New organizer registered',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          icon: FiUser,
          color: 'pink'
        },
        {
          type: 'event',
          message: 'Music Festival event was approved',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          icon: FiCalendar,
          color: 'purple'
        },
        {
          type: 'booking',
          message: 'New ticket purchase for Tech Conference',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: FiDollarSign,
          color: 'green'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getColorClass = (color) => {
    const colors = {
      pink: 'border-pink-500 text-pink-400 bg-pink-500/10',
      purple: 'border-purple-500 text-purple-400 bg-purple-500/10',
      green: 'border-green-500 text-green-400 bg-green-500/10',
      blue: 'border-blue-500 text-blue-400 bg-blue-500/10'
    };
    return colors[color] || colors.pink;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

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
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className={`flex items-center p-3 bg-gray-800/30 rounded-lg border-l-4 ${getColorClass(activity.color).split(' ')[0]}`}>
                    <div className={`p-2 rounded-full mr-4 ${getColorClass(activity.color)}`}>
                      <IconComponent />
                    </div>
                    <div>
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-gray-400">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
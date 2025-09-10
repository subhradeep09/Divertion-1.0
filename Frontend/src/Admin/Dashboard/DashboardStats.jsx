import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiUser } from 'react-icons/fi';
import adminAxios from '../../utils/adminAxios';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    revenue: 0,
    activeOrganizers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch data from multiple endpoints
      const [attendeesRes, organizersRes, pendingRes, approvedRes] = await Promise.all([
        adminAxios.get('/events/all-Attendees'),
        adminAxios.get('/events/all-Organizers'),
        adminAxios.get('/events/event-management'),
        adminAxios.get('/events/all-Approved-Events')
      ]);

      const totalAttendees = attendeesRes.data.message?.length || 0;
      const totalOrganizers = organizersRes.data.message?.length || 0;
      const pendingEvents = pendingRes.data.message?.length || 0;
      const approvedEvents = approvedRes.data.message?.length || 0;

      setStats({
        totalUsers: totalAttendees + totalOrganizers,
        totalEvents: pendingEvents + approvedEvents,
        revenue: 46200, // This would come from your revenue endpoint
        activeOrganizers: totalOrganizers
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <FiUsers className="text-2xl" />,
      change: '+12%',
      color: 'bg-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      title: 'Total Events',
      value: stats.totalEvents.toLocaleString(),
      icon: <FiCalendar className="text-2xl" />,
      change: '+8%',
      color: 'bg-pink-500/20',
      textColor: 'text-pink-400'
    },
    {
      title: 'Revenue',
      value: `$${(stats.revenue / 1000).toFixed(1)}K`,
      icon: <FiDollarSign className="text-2xl" />,
      change: '+23%',
      color: 'bg-green-500/20',
      textColor: 'text-green-400'
    },
    {
      title: 'Active Organizers',
      value: stats.activeOrganizers.toLocaleString(),
      icon: <FiUser className="text-2xl" />,
      change: '+3%',
      color: 'bg-purple-500/20',
      textColor: 'text-purple-400'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-pink-900/50 animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-pink-900/50 hover:border-pink-500/30 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className={`text-xs mt-2 flex items-center text-green-400`}>
                <span className="mr-1">↑</span>
                {stat.change} from last month
              </p>
            </div>
            <div className={`p-3 rounded-xl ${stat.color} ${stat.textColor}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
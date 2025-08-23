import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiUser } from 'react-icons/fi';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12.8K',
      icon: <FiUsers className="text-2xl" />,
      change: '+12%',
      trend: 'up',
      color: 'bg-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      title: 'Total Events',
      value: '1,243',
      icon: <FiCalendar className="text-2xl" />,
      change: '+8%',
      trend: 'up',
      color: 'bg-pink-500/20',
      textColor: 'text-pink-400'
    },
    {
      title: 'Revenue',
      value: '$46.2K',
      icon: <FiDollarSign className="text-2xl" />,
      change: '+23%',
      trend: 'up',
      color: 'bg-green-500/20',
      textColor: 'text-green-400'
    },
    {
      title: 'Active Organizers',
      value: '128',
      icon: <FiUser className="text-2xl" />,
      change: '+3%',
      trend: 'up',
      color: 'bg-purple-500/20',
      textColor: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-pink-900/50 hover:border-pink-500/30 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className={`text-xs mt-2 flex items-center ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                <span className={`mr-1 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? '↑' : '↓'}
                </span>
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
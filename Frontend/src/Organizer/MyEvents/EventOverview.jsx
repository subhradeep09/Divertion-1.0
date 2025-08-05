import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaFileAlt, FaHourglassEnd } from 'react-icons/fa';
import { organizerAxios } from '../../utils/axiosInstance';

const EventOverview = () => {
  const [statsData, setStatsData] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    drafts: 0,
    expiredEvents: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          organizerAxios.get('/events/upcoming'),
          organizerAxios.get('/events/past')
        ]);

        const upcomingEvents = Array.isArray(upcomingRes.data.message) ? upcomingRes.data.message.length : 0;
        const expiredEvents = Array.isArray(pastRes.data.message) ? pastRes.data.message.length : 0;
        const totalEvents = upcomingEvents + expiredEvents;

        setStatsData({
          totalEvents,
          upcomingEvents,
          drafts: 0, // TODO: Fetch drafts if needed
          expiredEvents
        });
      } catch (error) {
        console.error('Failed to fetch event stats:', error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Events', icon: <FaCalendarAlt />, value: statsData.totalEvents, color: 'from-pink-500 to-pink-700' },
    { label: 'Upcoming Events', icon: <FaClock />, value: statsData.upcomingEvents, color: 'from-purple-500 to-purple-700' },
    { label: 'Drafts', icon: <FaFileAlt />, value: statsData.drafts, color: 'from-blue-500 to-blue-700' },
    { label: 'Expired Events', icon: <FaHourglassEnd />, value: statsData.expiredEvents, color: 'from-red-500 to-red-700' }
  ];

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10 min-h-40  text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-pink-500 opacity-30 blur-[140px] z-0"></div>
      <div className="pointer-events-none absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-fuchsia-500 opacity-30 blur-[120px] z-0"></div>
      <div className="pointer-events-none absolute bottom-10 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-500 opacity-20 blur-[100px] z-0"></div>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl flex items-center gap-5 transition-transform hover:scale-[1.03] duration-300`}
        >
          <div className="text-4xl text-pink-400">{stat.icon}</div>
          <div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-pink-100">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventOverview;
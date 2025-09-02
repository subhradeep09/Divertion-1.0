import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiDownload, FiEye, FiUserCheck, FiCalendar, FiUsers } from 'react-icons/fi';
import organizerAxios from '../../utils/organizerAxios';

function Register() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch upcoming events from backend
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        const response = await organizerAxios.get("/events/upcoming");
        
        // Filter to only include APPROVED and PENDING events, and set attendeeCount from backend if available
        const upcomingData = Array.isArray(response.data.message)
          ? response.data.message
              .filter((event) => event.status === "APPROVED" || event.status === "PENDING")
              .map((event) => ({
                ...event,
                attendeeCount: event.attendeeCount || (event.attendees ? event.attendees.length : 0)
              }))
          : [];

        setUpcomingEvents(upcomingData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch upcoming events");
        console.error("Failed to fetch upcoming events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'approved' && event.status === 'APPROVED') ||
                         (statusFilter === 'pending' && event.status === 'PENDING');
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      APPROVED: "bg-gradient-to-r from-green-500 to-emerald-600",
      PENDING: "bg-gradient-to-r from-amber-500 to-orange-600",
      REJECTED: "bg-gradient-to-r from-rose-600 to-red-700"
    };
    
    const statusIcons = {
      APPROVED: <FiUserCheck className="mr-1" />,
      PENDING: <FiEye className="mr-1" />,
      REJECTED: <FiUsers className="mr-1" />
    };

    const statusText = {
      APPROVED: "Approved",
      PENDING: "Pending",
      REJECTED: "Rejected"
    };

    return (
      <span className={`${statusStyles[status]} text-white text-xs px-3 py-1.5 rounded-full flex items-center justify-center`}>
        {statusIcons[status]}
        {statusText[status]}
      </span>
    );
  };

  const handleViewRegistrations = (eventId) => {
    navigate(`/registration/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Event Registrations
          </h1>
          <p className="text-gray-400 mt-2">Manage registrations for your upcoming events</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 mb-6 border border-pink-500/20">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/60 text-white placeholder-gray-400 rounded-xl border-2 border-gray-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/60 text-white rounded-xl border-2 border-gray-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                  {event.title}
                </h3>
                {getStatusBadge(event.status)}
              </div>
              
              <p className="text-gray-400 mb-4 line-clamp-2">
                {event.description || 'No description available'}
              </p>

              <div className="flex space-x-3">
                <button 
                  onClick={() => handleViewRegistrations(event._id)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center"
                >
                  <FiUserCheck className="mr-2" />
                  View Registrations
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-2xl text-pink-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No upcoming events</h3>
            <p className="text-gray-400 mb-6">You don't have any upcoming events yet.</p>
            <button 
              onClick={() => navigate("/create-event")}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all font-medium"
            >
              Create Your First Event
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-gray-400 text-sm">
            Showing {filteredEvents.length} of {upcomingEvents.length} events
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
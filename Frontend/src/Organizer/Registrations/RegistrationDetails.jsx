// src/components/Registrations/RegistrationDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiUser, FiMail, FiPhone, FiCalendar, FiCreditCard, FiSearch } from 'react-icons/fi';
import organizerAxios from '../../utils/organizerAxios';

const RegistrationDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [attendees, setAttendees] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      try {
        setLoading(true);
        // Fetch event details
        // const eventResponse = await organizerAxios.get(`/events/${eventId}`);
        // setEvent(eventResponse.data.data);
        
        // Fetch registered attendees
        const attendeesResponse = await organizerAxios.get(`/events/view-registered-attendee/${eventId}`);
        setAttendees(Array.isArray(attendeesResponse.data.message) ? attendeesResponse.data.message : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch registration details');
        console.error('Error fetching registration details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchRegistrationDetails();
    }
  }, [eventId]);

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = attendee.user?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'paid' && attendee.paymentStatus === 'SUCCESS') ||
                         (statusFilter === 'free' && attendee.paymentStatus === 'FREE');
    
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Ticket ID', 'Payment Status', 'Registration Date'],
      ...filteredAttendees.map(attendee => [
        attendee.user?.fullname || 'N/A',
        attendee.user?.email || 'N/A',
        attendee.user?.phoneNumber || 'N/A',
        attendee.ticketId || 'N/A',
        attendee.paymentStatus || 'N/A',
        new Date(attendee.bookedAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${event?.title || 'event'}_registrations.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading registration details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
        <button 
          onClick={() => navigate(-1)}
          className="ml-4 px-4 py-2 bg-pink-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-20 flex items-center justify-between">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-pink-400 hover:text-pink-300 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to Events
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {event?.title || 'Event'} Registrations
            </h1>
            <p className="text-gray-400 mt-2">
              Manage and track all registrations for this event
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all flex items-center"
          >
            <FiDownload className="mr-2" />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-pink-500/20">
            <div className="flex items-center">
              <div className="p-3 bg-pink-500/10 rounded-full">
                <FiUser className="text-2xl text-pink-400" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Total Registrations</p>
                <p className="text-2xl font-bold text-white">{attendees.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-pink-500/20">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/10 rounded-full">
                <FiCreditCard className="text-2xl text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Paid Registrations</p>
                <p className="text-2xl font-bold text-white">
                  {attendees.filter(a => a.paymentStatus === 'SUCCESS').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-pink-500/20">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <FiCalendar className="text-2xl text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Free Registrations</p>
                <p className="text-2xl font-bold text-white">
                  {attendees.filter(a => a.paymentStatus === 'FREE').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 mb-6 border border-pink-500/20">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" />
              <input
                type="text"
                placeholder="Search registrations..."
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
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-pink-500/20 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-pink-600/20 to-purple-600/20">
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Attendee</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Ticket ID</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Payment Status</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Registration Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee._id} className="hover:bg-gray-700/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white group-hover:text-pink-300 transition-colors">
                        {attendee.user?.fullname || attendee.user || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center text-gray-300 mb-1">
                          <FiMail className="mr-2 text-pink-400" />
                          {attendee.user?.email || attendee.user || 'N/A'}
                        </div>
                        {attendee.user?.phoneNumber && (
                          <div className="flex items-center text-gray-400 text-sm">
                            <FiPhone className="mr-2 text-pink-400" />
                            {attendee.user.phoneNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm font-mono">{attendee.ticketId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs ${
                        attendee.paymentStatus === 'SUCCESS' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {attendee.paymentStatus === 'SUCCESS' ? 'Paid' : 'Free'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">
                        {new Date(attendee.bookedAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAttendees.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser className="text-2xl text-pink-400" />
              </div>
              <p className="text-gray-400">No registrations found</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-400 text-sm">
            Showing {filteredAttendees.length} of {attendees.length} registrations
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
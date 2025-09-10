import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiClock, FiCheck, FiX } from 'react-icons/fi';
import adminAxios from '../../utils/adminAxios';

const EventTable = ({ eventStatusUpdates }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate = useNavigate();

  const handleViewDetails = (eventId) => {
    navigate(`/admin/manage-events/${eventId}`);
  };

  // Add this function to fetch events from multiple endpoints
  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      
      // Fetch events from all endpoints
      const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
        adminAxios.get('/events/event-management'),
        adminAxios.get('/events/all-Approved-Events'),
        adminAxios.get('/events/all-Rejected-Events')
      ]);

      // Combine all events
      const allEvents = [
        ...(pendingRes.data.message || []),
        ...(approvedRes.data.message || []),
        ...(rejectedRes.data.message || [])
      ];

      setEvents(allEvents);
    } catch (err) {
      console.error("Failed to fetch events", err);
      // Fallback to just pending events if other endpoints fail
      try {
        const pendingRes = await adminAxios.get('/events/event-management');
        setEvents(pendingRes.data.message || []);
      } catch (fallbackErr) {
        console.error("Failed to fetch pending events", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  // Update the useEffect to use fetchAllEvents
  useEffect(() => {
    fetchAllEvents();
  }, []);

  const getStatus = (eventId, currentStatus) => {
    return eventStatusUpdates[eventId]?.status || currentStatus;
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.organizer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || getStatus(event._id, event.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      "APPROVED": { class: "bg-green-500/20 text-green-300", icon: <FiCheck className="mr-1" /> },
      "PENDING": { class: "bg-yellow-500/20 text-yellow-300", icon: <FiClock className="mr-1" /> },
      "REJECTED": { class: "bg-red-500/20 text-red-300", icon: <FiX className="mr-1" /> }
    };
    
    const config = statusConfig[status] || statusConfig.PENDING;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${config.class}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-pulse text-pink-500 flex items-center">
        <FiClock className="animate-spin mr-2" />
        Loading events...
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-pink-900/50 overflow-hidden">
      <div className="p-6 border-b border-pink-900/50">
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Event Management
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search events by title or organizer email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pl-10"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800/50 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-pink-900/20">
              <th className="px-6 py-4 text-left text-pink-300 font-medium">Event</th>
              <th className="px-6 py-4 text-left text-pink-300 font-medium">Date</th>
              <th className="px-6 py-4 text-left text-pink-300 font-medium">Organizer</th>
              <th className="px-6 py-4 text-left text-pink-300 font-medium">Status</th>
              <th className="px-6 py-4 text-left text-pink-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                  No events found matching your criteria
                </td>
              </tr>
            ) : (
              filteredEvents.map((event, idx) => (
                <tr 
                  key={event._id} 
                  className={`border-t border-gray-800 hover:bg-pink-900/10 transition-colors ${idx % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/10'}`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{event.title}</p>
                      <p className="text-sm text-gray-400 truncate max-w-xs">{event.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400">{event.startTime}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-300">{event.organizer?.email || "-"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={getStatus(event._id, event.status)} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="flex items-center bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-lg shadow-pink-500/10"
                      onClick={() => handleViewDetails(event._id)}
                    >
                      <FiEye className="mr-1.5" />
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-pink-900/50 text-sm text-gray-400 flex justify-between items-center">
        <div>
          Showing {filteredEvents.length} of {events.length} events
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="px-2">Page 1 of 1</span>
          <button className="p-1 rounded bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTable;
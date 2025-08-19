import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxios from '../../utils/adminAxios';

const EventTable = ({ eventStatusUpdates }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await adminAxios.get('/events/event-management');
      if (res.data && res.data.message) {
        setEvents(res.data.message);
      }
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getStatus = (eventId, currentStatus) => {
    return eventStatusUpdates[eventId]?.status || currentStatus;
  };

  if (loading) return <div className="p-4 text-center text-pink-500">Loading events...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-pink-600 text-black">
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Organizer Email</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => (
            <tr key={event._id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
              <td className="px-4 py-3">{idx + 1}</td>
              <td className="px-4 py-3">{event.title}</td>
              <td className="px-4 py-3">{new Date(event.date).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span className={`font-semibold ${getStatus(event._id, event.status) === 'APPROVED' ? 'text-green-400' : getStatus(event._id, event.status) === 'REJECTED' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {getStatus(event._id, event.status)}
                </span>
              </td>
              <td className="px-4 py-3">{event.organizer?.email || "-"}</td>
              <td className="px-4 py-3">
                <button
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-3 rounded-lg transition-colors"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
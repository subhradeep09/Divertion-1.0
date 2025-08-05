import React from 'react';
import { Link } from 'react-router-dom';

const OrganizerEventCard = ({ event, onDelete }) => {
  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-pink-200/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-pink-500 p-5 transition duration-300 hover:shadow-pink-400">
      <div className="flex flex-col gap-4">
        <img
          src={event.banner || 'https://via.placeholder.com/150'}
          alt={event.title ? `Banner for ${event.title}` : 'Event Banner'}
          className="w-full h-48 object-cover rounded-lg border border-pink-400"
        />
        <div className="flex-1 text-white space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-pink-300">{event.title}</h3>
            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
              event.status === 'Published' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'
            }`}>
              {event.status}
            </span>
          </div>
          <p className="text-sm text-pink-200">📍 {event.location}</p>
          <p className="text-sm text-pink-200">🗓️ {formattedDate} at {formattedTime}</p>
          <p className="text-sm text-pink-200">
            💵 Price: {event.isPaid && typeof event.price === 'number' ? `₹${event.price}` : 'Free'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 justify-between">
            <button className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition">View</button>
            <Link
              to={`/update-event/${event._id}`}
              className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition"
            >
              Edit
            </Link>
            <button className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition">Analytics</button>
            <button className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition">Duplicate</button>
            <button
              onClick={() => {
                console.log('Delete button clicked for event:', event._id);
                if (onDelete) {
                  onDelete(event._id);
                }
              }}
              className="px-3 py-1 text-sm border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-white transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerEventCard;

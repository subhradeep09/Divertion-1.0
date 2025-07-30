import React from 'react';

const OrganizerEventCard = ({ event }) => {
  return (
    <div className="bg-pink-200/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-pink-500 p-5 transition duration-300 hover:shadow-pink-400">
      <div className="flex flex-col gap-4">
        <img
          src={event.banner || 'https://via.placeholder.com/150'}
          alt="Event Banner"
          className="w-full h-48 object-cover rounded-lg border border-pink-400"
        />
        <div className="flex-1 text-white">
          <h3 className="text-xl font-bold mb-2 text-pink-300">{event.title}</h3>
          <p className="text-sm text-pink-200">📍 {event.location}</p>
          <p className="text-sm text-pink-200">🗓️ {event.date} at {event.time}</p>
          <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-semibold ${
            event.status === 'Published' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'
          }`}>
            {event.status}
          </span>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition">View</button>
            <button className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition">Edit</button>
            <button className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition">Analytics</button>
            <button className="px-3 py-1 text-sm border border-pink-400 text-pink-300 rounded hover:bg-pink-400 hover:text-white transition">Duplicate</button>
            <button className="px-3 py-1 text-sm border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-white transition">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerEventCard;

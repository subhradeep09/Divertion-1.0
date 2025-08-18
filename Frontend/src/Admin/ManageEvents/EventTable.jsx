

import React from 'react';

const EventTable = () => {
  const events = [
    { id: 1, title: 'Music Concert', date: '2025-09-01', type: 'Offline', status: 'Active' },
    { id: 2, title: 'Webinar on AI', date: '2025-09-10', type: 'Online', status: 'Upcoming' },
    { id: 3, title: 'Art Workshop', date: '2025-09-15', type: 'Offline', status: 'Cancelled' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Type</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-2 border-b">{event.id}</td>
              <td className="px-4 py-2 border-b">{event.title}</td>
              <td className="px-4 py-2 border-b">{event.date}</td>
              <td className="px-4 py-2 border-b">{event.type}</td>
              <td className="px-4 py-2 border-b">{event.status}</td>
              <td className="px-4 py-2 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
import React, { useState } from 'react';
import EventTable from './EventTable';
import EventDetailsModal from './EventDetailsModal';
import { useParams } from 'react-router-dom';

const ManageEvents = () => {
  const { eventId } = useParams();
  const [eventStatusUpdates, setEventStatusUpdates] = useState({});

  const handleStatusUpdate = (updatedEventId, newStatus, reason) => {
    setEventStatusUpdates(prev => ({
      ...prev,
      [updatedEventId]: { status: newStatus, rejectionReason: reason }
    }));
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-pink-500">Manage Events</h1>
      <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
        {eventId ? (
          <EventDetailsModal
            onStatusUpdate={handleStatusUpdate}
          />
        ) : (
          <EventTable
            eventStatusUpdates={eventStatusUpdates}
          />
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
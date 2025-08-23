// File 3: ManageEvents.jsx
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
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 mt-20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Event Management Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Review, approve, or reject events submitted by organizers
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-pink-900/50 p-6">
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
    </div>
  );
};

export default ManageEvents;


import React, { useState } from 'react';
import EventTable from './EventTable';
import EventDetailsModal from './EventDetailsModal';

const ManageEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (event) => {
    alert(`Edit event: ${event.title}`);
  };

  const handleDelete = (event) => {
    alert(`Delete event: ${event.title}`);
  };

  const handleToggleStatus = (event) => {
    alert(`Toggle status for event: ${event.title}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>
      <EventTable />
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default ManageEvents;
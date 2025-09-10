import React, { useState, useEffect } from 'react';
import EventTable from './EventTable';
import EventDetailsModal from './EventDetailsModal';
import { useParams, useNavigate } from 'react-router-dom';
import adminAxios from '../../utils/adminAxios';
import { showError } from '../../utils/toaster';

const ManageEvents = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventStatusUpdates, setEventStatusUpdates] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Fetch from all event endpoints
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
    } catch (error) {
      showError('Failed to fetch events');
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (updatedEventId, newStatus, reason) => {
    try {
      // Update event status via API
      await adminAxios.patch(`/events/update-Event-Status/${updatedEventId}`, {
        status: newStatus,
        rejectionReason: reason
      });

      setEventStatusUpdates(prev => ({
        ...prev,
        [updatedEventId]: { status: newStatus, rejectionReason: reason }
      }));

      // Refresh events list
      fetchEvents();
      
      // If we're viewing an event details modal, close it
      if (eventId === updatedEventId) {
        navigate('/admin/manage-events');
      }
    } catch (error) {
      showError('Failed to update event status');
      console.error('Error updating event status:', error);
    }
  };

  const handleCloseModal = () => {
    navigate('/admin/manage-events');
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
          <EventTable
            events={events}
            loading={loading}
            eventStatusUpdates={eventStatusUpdates}
            onRefresh={fetchEvents}
          />
        </div>

        {/* Render the modal if eventId is present in URL */}
        {eventId && (
          <EventDetailsModal
            eventId={eventId}
            onStatusUpdate={handleStatusUpdate}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
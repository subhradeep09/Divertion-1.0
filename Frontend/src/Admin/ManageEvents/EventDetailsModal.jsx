import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminAxios from '../../utils/adminAxios';

const EventDetailsModal = ({ onStatusUpdate }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await adminAxios.get(`/events/event-management`);
        const foundEvent = res.data.message.find(e => e._id === eventId);
        if (!foundEvent) {
          throw { response: { status: 404 } };
        }
        setEvent(foundEvent);
        setRejectionReason(foundEvent.rejectionReason || "");
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Event not found or unauthorized");
        } else {
          setError("Failed to fetch event details");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const updateStatus = async (action) => {
    setActionLoading(true);
    setError(null);
    try {
      const payload = { action };
      if (action === "REJECTED") {
        if (!rejectionReason.trim()) {
          setError("Please enter a rejection reason");
          setActionLoading(false);
          return;
        }
        payload.rejectionReason = rejectionReason;
      }
      await adminAxios.patch(`/events/update-Event-Status/${event._id}`, payload);
      const updatedEvent = { ...event, status: action, rejectionReason: payload.rejectionReason || "" };
      setEvent(updatedEvent);
      if (onStatusUpdate) {
        onStatusUpdate(updatedEvent._id, updatedEvent.status, updatedEvent.rejectionReason);
      }
      navigate("/admin/manage-events");
    } catch (err) {
      setError(`Failed to ${action.toLowerCase()} event`);
    } finally {
      setActionLoading(false);
    }
  };

  const organizerEmail = typeof event?.organizer === "string" ? event.organizer : event?.organizer?.email;

  if (loading) return <div className="p-6 text-center text-pink-500">Loading event details...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!event) return <div className="p-6 text-center text-white">Event not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-pink-500">Event Details</h2>
      <div className="space-y-2 text-sm">
        <p><strong>ID:</strong> <span className="text-gray-400">{event._id}</span></p>
        <p><strong>Title:</strong> <span className="text-gray-400">{event.title}</span></p>
        <p><strong>Description:</strong> <span className="text-gray-400">{event.description}</span></p>
        <p><strong>Date:</strong> <span className="text-gray-400">{new Date(event.date).toLocaleDateString()}</span></p>
        <p><strong>Start Time:</strong> <span className="text-gray-400">{event.startTime}</span></p>
        <p><strong>Location:</strong> <span className="text-gray-400">{event.location}</span></p>
        <p><strong>Venue Details:</strong> <span className="text-gray-400">{event.venueDetails}</span></p>
        <p><strong>Is Online:</strong> <span className="text-gray-400">{event.isOnline ? "Yes" : "No"}</span></p>
        <p><strong>Event Link:</strong> <span className="text-gray-400">{event.eventLink}</span></p>
        <p><strong>Capacity:</strong> <span className="text-gray-400">{event.capacity}</span></p>
        <p><strong>Banner Image:</strong> <span className="text-gray-400">{event.bannerImage}</span></p>
        <p><strong>Status:</strong> <span className={`font-semibold ${event.status === 'APPROVED' ? 'text-green-400' : event.status === 'REJECTED' ? 'text-red-400' : 'text-yellow-400'}`}>{event.status}</span></p>
        <p><strong>Is Published:</strong> <span className="text-gray-400">{event.isPublished ? "Yes" : "No"}</span></p>
        {event.rejectionReason && <p><strong>Rejection Reason:</strong> <span className="text-red-400">{event.rejectionReason}</span></p>}
        <p><strong>Is Paid:</strong> <span className="text-gray-400">{event.isPaid ? "Yes" : "No"}</span></p>
        <p><strong>Price:</strong> <span className="text-gray-400">{event.price}</span></p>
        <p><strong>Theme:</strong> <span className="text-gray-400">{event.theme}</span></p>
        <p><strong>Organizer Email:</strong> <span className="text-gray-400">{organizerEmail}</span></p>
      </div>

      {event.status === "PENDING" && (
        <div className="mt-4">
          <label className="block mb-2 font-medium text-pink-500">Rejection Reason (required if rejecting)</label>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows={3}
            placeholder="Enter reason for rejection"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        {event.status === "PENDING" && (
          <>
            <button
              onClick={() => updateStatus("APPROVED")}
              disabled={actionLoading}
              className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 transition-colors flex-1"
            >
              {actionLoading ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={() => updateStatus("REJECTED")}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 transition-colors flex-1"
            >
              {actionLoading ? "Rejecting..." : "Reject"}
            </button>
          </>
        )}
        <button
          onClick={() => navigate("/manage-events")}
          className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex-1"
        >
          Close
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default EventDetailsModal;
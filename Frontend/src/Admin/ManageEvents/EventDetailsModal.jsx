import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiX, FiClock, FiAlertCircle } from 'react-icons/fi';
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
      navigate("/manage-events");
    } catch (err) {
      setError(`Failed to ${action.toLowerCase()} event`);
    } finally {
      setActionLoading(false);
    }
  };

  const organizerEmail = typeof event?.organizer === "string" ? event.organizer : event?.organizer?.email;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-pink-500 text-lg flex items-center">
        <FiClock className="mr-2 animate-spin" />
        Loading event details...
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-red-400">
      <FiAlertCircle className="text-4xl mb-3" />
      <p className="text-lg">{error}</p>
      <button 
        onClick={() => navigate("/manage-events")}
        className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
      >
        Back to Events
      </button>
    </div>
  );
  
  if (!event) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <FiAlertCircle className="text-4xl mb-3 text-pink-500" />
      <p className="text-white text-lg">Event not found</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 py-20 px-20 shadow-2xl border border-pink-900/50">
      <div className="flex items-center mb-6 mt-10">
        <button
          onClick={() => navigate("/manage-events")}
          className="flex items-center text-pink-400 hover:text-pink-300 mr-4 transition-colors"
        >
          <FiArrowLeft className="mr-1" /> Back
        </button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Event Details
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-pink-400 font-semibold mb-1">Event Information</h3>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <p className="mb-1"><span className="text-pink-300">Title:</span> {event.title}</p>
              <p className="mb-1"><span className="text-pink-300">Description:</span> {event.description}</p>
              <p className="mb-1"><span className="text-pink-300">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
              <p className="mb-1"><span className="text-pink-300">Time:</span> {event.startTime}</p>
              <p className="mb-1"><span className="text-pink-300">Location:</span> {event.location}</p>
              <p className="mb-0"><span className="text-pink-300">Venue:</span> {event.venueDetails}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-pink-400 font-semibold mb-1">Event Settings</h3>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <p className="mb-1"><span className="text-pink-300">Online Event:</span> {event.isOnline ? "Yes" : "No"}</p>
              <p className="mb-1"><span className="text-pink-300">Event Link:</span> {event.eventLink || "N/A"}</p>
              <p className="mb-1"><span className="text-pink-300">Capacity:</span> {event.capacity}</p>
              <p className="mb-1"><span className="text-pink-300">Published:</span> {event.isPublished ? "Yes" : "No"}</p>
              <p className="mb-1"><span className="text-pink-300">Paid Event:</span> {event.isPaid ? "Yes" : "No"}</p>
              {event.isPaid && <p className="mb-0"><span className="text-pink-300">Price:</span> ${event.price}</p>}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-pink-400 font-semibold mb-1">Status & Organizer</h3>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <span className="text-pink-300 mr-2">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  event.status === 'APPROVED' ? 'bg-green-500/20 text-green-300' : 
                  event.status === 'REJECTED' ? 'bg-red-500/20 text-red-300' : 
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {event.status}
                </span>
              </div>
              <p className="mb-1"><span className="text-pink-300">Theme:</span> {event.theme || "N/A"}</p>
              <p className="mb-1"><span className="text-pink-300">Organizer:</span> {organizerEmail || "N/A"}</p>
              <p className="mb-0"><span className="text-pink-300">Event ID:</span> {event._id}</p>
            </div>
          </div>
          
          {event.bannerImage && (
            <div>
              <h3 className="text-pink-400 font-semibold mb-1">Banner Preview</h3>
              <div className="bg-gray-800/50 p-3 rounded-xl">
                <img 
                  src={event.bannerImage} 
                  alt="Event banner" 
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          )}
          
          {event.rejectionReason && (
            <div>
              <h3 className="text-pink-400 font-semibold mb-1">Rejection Reason</h3>
              <div className="bg-red-900/20 p-3 rounded-xl border border-red-800/50">
                <p className="text-red-300">{event.rejectionReason}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {event.status === "PENDING" && (
        <div className="mb-6 bg-gray-800/30 p-4 rounded-xl border border-pink-900/50">
          <label className="block mb-2 font-medium text-pink-400">Rejection Reason (required if rejecting)</label>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full border border-gray-700 bg-gray-900/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows={3}
            placeholder="Please provide a clear reason for rejection..."
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {event.status === "PENDING" && (
          <>
            <button
              onClick={() => updateStatus("APPROVED")}
              disabled={actionLoading}
              className="flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 transition-all shadow-lg shadow-green-500/10"
            >
              <FiCheck className="mr-2" />
              {actionLoading ? "Approving..." : "Approve Event"}
            </button>
            <button
              onClick={() => updateStatus("REJECTED")}
              disabled={actionLoading || !rejectionReason.trim()}
              className="flex items-center justify-center bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 transition-all shadow-lg shadow-red-500/10"
            >
              <FiX className="mr-2" />
              {actionLoading ? "Rejecting..." : "Reject Event"}
            </button>
          </>
        )}
        <button
          onClick={() => navigate("/manage-events")}
          className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-all"
        >
          Close Details
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-red-300">
          {error}
        </div>
      )}
    </div>
  );
};

export default EventDetailsModal;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import organizerAxios from "../../utils/organizerAxios";

const OrganizerEventCard = ({ event, onDelete, isPast }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    navigate(`/update-event/${event._id}`, { state: { event } });
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await organizerAxios.delete(`/events/${event._id}`);
      toast.success("Event deleted successfully");
      if (onDelete) onDelete(event._id);
      navigate(0);
    } catch (error) {
      console.error("Failed to delete event", error);
      toast.error("Failed to delete event");
    } finally {
      setShowConfirm(false);
    }
  };

  const getStatusBadge = () => {
    switch (event.status) {
      case "APPROVED":
        return <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Approved</span>;
      case "PENDING":
        return <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">Pending</span>;
      case "REJECTED":
        return <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Rejected</span>;
      default:
        return <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">Unknown</span>;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
      <img
        src={event.bannerImage}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
          {getStatusBadge()}
        </div>
        <p className="text-pink-400 text-sm mb-2">
          {format(new Date(event.date), "MMM dd, yyyy")} • {event.startTime}
        </p>
        <p className="text-gray-300 text-sm mb-2">{event.location}</p>
        <p className="text-gray-400 text-sm mb-2">
          {event.isOnline ? "Online Event" : "In-person Event"}
        </p>
        {event.isPaid && (
          <p className="text-gray-300 text-sm">
            <span className="font-medium">Price:</span> ${event.price}
          </p>
        )}
      </div>
      <div className="px-4 py-3 bg-gray-900">
        <div className="flex justify-between space-x-2">
          <button
            onClick={handleEdit}
            className="text-white bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded text-sm transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
          >
            Delete
          </button>
          <Link
            to={`/event-details/${event._id}`}
            className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors text-center"
          >
            View
          </Link>
        </div>
      </div>
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xs border border-gray-700 flex flex-col items-center">
            <p className="text-white text-center mb-4">Are you sure you want to delete this event?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerEventCard;
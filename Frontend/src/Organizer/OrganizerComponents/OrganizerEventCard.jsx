import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { 
  FiEdit, FiTrash2, FiEye, FiClock, FiMapPin, FiDollarSign, 
  FiGlobe, FiUser, FiCalendar, FiX, FiCheck, FiUsers,
  FiArrowRight, FiCopy
} from "react-icons/fi";
import organizerAxios from "../../utils/organizerAxios";

const OrganizerEventCard = ({ event, onDelete, isPast }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/update-event/${event._id}`, { state: { event } });
  };

  const handleDelete = () => {
    setShowConfirm(true);
    setConfirmText("");
  };

  const confirmDelete = async () => {
    if (confirmText !== event.title) {
      toast.error("Event title doesn't match");
      return;
    }

    setIsDeleting(true);
    try {
      await organizerAxios.delete(`/events/${event._id}`);
      toast.success("Event deleted successfully");
      if (onDelete) onDelete(event._id);
    } catch (error) {
      console.error("Failed to delete event", error);
      toast.error("Failed to delete event");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
      setConfirmText("");
    }
  };

  const copyTitle = () => {
    navigator.clipboard.writeText(event.title);
    toast.success("Title copied to clipboard");
  };

  const getStatusBadge = () => {
    const statusConfig = {
      "APPROVED": { 
        class: "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/20", 
        icon: <FiCheck className="mr-1" /> 
      },
      "PENDING": { 
        class: "bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20", 
        icon: <FiClock className="mr-1" /> 
      },
      "REJECTED": { 
        class: "bg-gradient-to-r from-rose-600 to-red-700 shadow-lg shadow-rose-500/20", 
        icon: <FiX className="mr-1" /> 
      },
      "default": { 
        class: "bg-gradient-to-r from-gray-600 to-gray-700", 
        icon: null 
      }
    };
    
    const config = statusConfig[event.status] || statusConfig.default;
    
    return (
      <span className={`${config.class} text-white text-xs px-3 py-1.5 rounded-full flex items-center font-medium`}>
        {config.icon}
        {event.status}
      </span>
    );
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const isDeleteDisabled = confirmText !== event.title || isDeleting;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-700 hover:border-pink-500/30 relative group transform hover:-translate-y-1">
      {/* Premium ribbon for paid events */}
      {event.isPaid && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
            <FiDollarSign className="mr-1" />
            Premium
          </div>
        </div>
      )}
      
      {/* Event image with fallback */}
      <div className="relative overflow-hidden">
        <div className="h-48 w-full bg-gradient-to-br from-purple-900 to-pink-800 flex items-center justify-center">
          {!imageError ? (
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={handleImageError}
            />
          ) : (
            <div className="text-center p-4 text-white">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUser className="text-2xl text-pink-400" />
              </div>
              <p className="text-sm text-pink-200">Event Image</p>
            </div>
          )}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        
        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center font-medium">
          <FiCalendar className="mr-1.5" />
          {format(new Date(event.date), "MMM dd, yyyy")}
        </div>

        {/* Capacity badge */}
        <div className="absolute top-4 left-28 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center font-medium">
          <FiUsers className="mr-1.5" />
          {event.capacity}
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white line-clamp-1 pr-2">{event.title}</h3>
        </div>
        
        <div className="mb-4">
          {getStatusBadge()}
        </div>
        
        <div className="space-y-2.5 mb-4 text-sm">
          <div className="flex items-center text-gray-300">
            <FiClock className="mr-2 text-pink-400 flex-shrink-0" />
            <span>{event.startTime}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <FiMapPin className="mr-2 text-pink-400 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <FiGlobe className="mr-2 text-pink-400 flex-shrink-0" />
            <span>{event.isOnline ? "Online Event" : "In-person Event"}</span>
          </div>
          
          {event.isPaid && (
            <div className="flex items-center text-gray-300">
              <FiDollarSign className="mr-2 text-pink-400 flex-shrink-0" />
              <span>${event.price} USD</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="px-5 py-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700">
        <div className="flex justify-between space-x-3">
          <button
            onClick={handleEdit}
            className="flex-1 bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 text-white px-3 py-2.5 rounded-lg text-sm transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-pink-500/20 group/edit"
            title="Edit Event"
          >
            <FiEdit className="mr-1.5 group-hover/edit:scale-110 transition-transform" />
            Edit
          </button>
          
          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-3 py-2.5 rounded-lg text-sm transition-all duration-300 flex items-center justify-center shadow-md group/delete"
            title="Delete Event"
          >
            <FiTrash2 className="mr-1.5 group-hover/delete:scale-110 transition-transform" />
            Delete
          </button>
          
          <Link
            to={`/event-details/${event._id}`}
            state={{ event }}
            className="flex-1 bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-800 hover:to-purple-900 text-white px-3 py-2.5 rounded-lg text-sm transition-all duration-300 flex items-center justify-center shadow-md group/view"
            title="View Event Details"
          >
            <FiEye className="mr-1.5 group-hover/view:scale-110 transition-transform" />
            View
          </Link>
        </div>
      </div>
      
      {/* Enhanced Delete confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-700">
            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-2xl text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
              <p className="text-gray-300 mb-1">This action cannot be undone. This will permanently delete:</p>
              <p className="text-pink-400 font-medium mb-4">"{event.title}"</p>
            </div>
            
            <div className="mb-5">
              <label className="block text-gray-400 text-sm mb-2">
                Please type <span className="font-mono text-pink-400">{event.title}</span> to confirm
                <button 
                  onClick={copyTitle}
                  className="ml-2 text-pink-500 hover:text-pink-400 inline-flex items-center text-xs"
                  title="Copy title"
                >
                  <FiCopy className="mr-1" /> Copy
                </button>
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Type the event title to confirm"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText("");
                }}
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 flex items-center shadow-md"
              >
                <FiX className="mr-1.5" />
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleteDisabled}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center shadow-md ${
                  isDeleteDisabled 
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-rose-700 to-red-800 hover:from-rose-800 hover:to-red-900 text-white hover:shadow-rose-500/20"
                }`}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1.5"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="mr-1.5" />
                    Delete Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerEventCard;
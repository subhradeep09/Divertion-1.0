import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import attendeeAxios from "../../utils/attendeeAxios";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleBookNow = async () => {
    setLoading(true);
    try {
      await attendeeAxios.post(`/events/book-events/${event?._id}`);
      alert("Event booked successfully!");
      setBooked(true);
    } catch (error) {
      alert("Failed to book event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultBanner = "https://placehold.co/600x300/1a1a1a/ff0080?text=Event+Image";

  const formatDate = (dateStr) => {
    if (!dateStr) return "Date not available";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "Time not available";
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isPaid = event?.isPaid ?? false;
  const price = event?.price ?? 0;

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-800">
      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageError ? defaultBanner : (event?.bannerImage || defaultBanner)}
          alt={event?.title || "Event banner"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {isPaid && price > 0 ? `$${price}` : "FREE"}
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {event?.title || "Untitled Event"}
        </h2>
        
        <p className="text-gray-300 mb-4 line-clamp-2">
          {event?.description || "No description available."}
        </p>

        {/* Event details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <div className="flex items-center">
            <span className="text-pink-500 mr-2">📅</span>
            <span className="text-gray-300 text-sm">
              {event?.date ? formatDate(event.date) : "Date not available"}
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-pink-500 mr-2">⏰</span>
            <span className="text-gray-300 text-sm">
              {event?.startTime
                ? formatTime(event.startTime)
                : "Time not available"}
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-pink-500 mr-2">📍</span>
            <span className="text-gray-300 text-sm">
              {event?.location || "Location not available"}
            </span>
          </div>
          
          {event?.venueDetails && (
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">🏛️</span>
              <span className="text-gray-300 text-sm">{event.venueDetails}</span>
            </div>
          )}
          
          {event?.theme && (
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">🎨</span>
              <span className="text-gray-300 text-sm">{event.theme}</span>
            </div>
          )}
          
          {event?.capacity !== undefined && (
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">👥</span>
              <span className="text-gray-300 text-sm">{event.capacity} spots</span>
            </div>
          )}
        </div>

        {/* Book button */}
        {booked ? (
          <button
            disabled
            className="w-full py-3 rounded-lg font-semibold bg-gray-700 cursor-not-allowed text-gray-400"
          >
            Booked
          </button>
        ) : (
          <button
            onClick={handleBookNow}
            disabled={loading || !event?._id}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              loading || !event?._id
                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Booking...
              </div>
            ) : (
              "Book Now"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
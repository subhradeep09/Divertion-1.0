import React, { useState } from "react";
import CancelBookingModal from "./CancelBookingModal";

const BookingCard = ({ booking, isHistory }) => {
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const event = booking?.event;

  if (!event) return null;

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

  const isUpcoming = new Date(event.date) >= new Date();
  const isPaid = booking.paymentStatus === "SUCCESS";
  const isFree = booking.paymentStatus === "FREE";

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-pink-500/30 transition-colors">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {event.title || "Untitled Event"}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isUpcoming 
                  ? "bg-green-500/10 text-green-400" 
                  : "bg-gray-700 text-gray-400"
              }`}>
                {isUpcoming ? "Upcoming" : "Past Event"}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isPaid 
                  ? "bg-pink-500/10 text-pink-400" 
                  : "bg-blue-500/10 text-blue-400"
              }`}>
                {isPaid ? "Paid" : "Free"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                Ticket ID: {booking.ticketId?.substring(0, 8)}...
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 bg-gray-800 px-3 py-2 rounded-lg">
            <p>Booked on: {formatDate(booking.createdAt)}</p>
          </div>
        </div>

        {event.bannerImage && (
          <div className="mb-5 rounded-lg overflow-hidden">
            <img 
              src={event.bannerImage} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-pink-500/10 p-2 rounded-lg mr-3">
              <span className="text-pink-500">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Event Date</p>
              <p className="text-white">
                {event.date ? formatDate(event.date) : "Date not available"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-pink-500/10 p-2 rounded-lg mr-3">
              <span className="text-pink-500">⏰</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Time</p>
              <p className="text-white">
                {event.startTime
                  ? formatTime(event.startTime)
                  : "Time not available"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-pink-500/10 p-2 rounded-lg mr-3">
              <span className="text-pink-500">📍</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="text-white">
                {event.location || "Location not available"}
              </p>
            </div>
          </div>
          
          {event.venueDetails && (
            <div className="flex items-center">
              <div className="bg-pink-500/10 p-2 rounded-lg mr-3">
                <span className="text-pink-500">🏛️</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Venue</p>
                <p className="text-white">{event.venueDetails}</p>
              </div>
            </div>
          )}
        </div>

        {isUpcoming && !isHistory && (
          <div className="flex flex-wrap gap-3">
            {booking.qrCodeUrl && (
              <button 
                onClick={() => setShowQR(!showQR)}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
              >
                {showQR ? "Hide QR Code" : "View QR Code"}
              </button>
            )}
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium">
              Add to Calendar
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 border border-red-600 hover:border-red-700 text-red-500 hover:text-red-400 rounded-lg transition-colors font-medium"
            >
              Cancel Booking
            </button>
          </div>
        )}

        {showQR && booking.qrCodeUrl && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <p className="text-gray-300 mb-3">Scan this QR code at the event</p>
            <img 
              src={booking.qrCodeUrl} 
              alt="Event QR Code" 
              className="mx-auto w-40 h-40"
            />
            <p className="text-gray-400 text-sm mt-3">Ticket ID: {booking.ticketId}</p>
          </div>
        )}
      </div>

      {showModal && (
        <CancelBookingModal
          bookingId={booking._id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BookingCard;
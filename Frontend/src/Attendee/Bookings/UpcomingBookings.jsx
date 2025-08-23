import React, { useEffect, useState } from "react";
import attendeeAxios from "../../utils/attendeeAxios";
import BookingCard from "./BookingCard";

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await attendeeAxios.get("/events/upcoming-Booked-Events");
        setBookings(res.data?.message || []);
      } catch (err) {
        console.error("Error fetching upcoming bookings:", err);
        setError("Failed to load upcoming bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
            <div className="text-pink-500 text-5xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Your Upcoming Events</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage your upcoming event bookings and access your tickets
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
            <div className="text-pink-500 text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No upcoming bookings</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              You don't have any upcoming events. Explore events to book your next experience!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-400">
                You have {bookings.length} upcoming event{bookings.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpcomingBookings;
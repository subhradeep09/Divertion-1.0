import React, { useEffect, useState } from "react";
import attendeeAxios from "../../utils/attendeeAxios";
import BookingCard from "./BookingCard";

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await attendeeAxios.get("/events/booking-History");
        setHistory(res.data?.message || []);
      } catch (err) {
        console.error("Error fetching booking history:", err);
        setError("Failed to load booking history. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(booking => {
    const matchesSearch = booking.event?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.event?.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const eventDate = new Date(booking.event?.date);
    
    if (filter === "upcoming") {
      return eventDate >= now && matchesSearch;
    } else if (filter === "past") {
      return eventDate < now && matchesSearch;
    }
    
    return matchesSearch;
  });

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
          <h1 className="text-4xl font-bold text-white mb-3">Your Booking History</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage and view all your event bookings in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-pink-500/10 p-3 mr-4">
                <span className="text-2xl text-pink-500">📅</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{history.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-pink-500/10 p-3 mr-4">
                <span className="text-2xl text-pink-500">🚀</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold text-white">
                  {history.filter(b => new Date(b.event?.date) >= new Date()).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-pink-500/10 p-3 mr-4">
                <span className="text-2xl text-pink-500">✅</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Past Events</p>
                <p className="text-2xl font-bold text-white">
                  {history.filter(b => new Date(b.event?.date) < new Date()).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all" 
                    ? "bg-pink-600 text-white" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All Bookings
              </button>
              <button
                onClick={() => setFilter("upcoming")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "upcoming" 
                    ? "bg-pink-600 text-white" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "past" 
                    ? "bg-pink-600 text-white" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Past Events
              </button>
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
            <div className="text-pink-500 text-6xl mb-4">🎫</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {searchTerm || filter !== "all" ? "No matching bookings" : "No bookings yet"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your search or filters" 
                : "Start exploring events and make your first booking!"}
            </p>
            {(searchTerm || filter !== "all") && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-400">
                Showing {filteredHistory.length} of {history.length} bookings
              </p>
              {(searchTerm || filter !== "all") && (
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                  }}
                  className="text-pink-500 hover:text-pink-400 text-sm font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <div className="grid gap-6">
              {filteredHistory.map((booking) => (
                <BookingCard key={booking._id} booking={booking} isHistory />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
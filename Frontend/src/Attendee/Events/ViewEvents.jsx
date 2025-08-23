import React, { useEffect, useState } from "react";
import attendeeAxios from "../../utils/attendeeAxios";
import EventCard from "./EventCard";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await attendeeAxios.get("/events/view-Events");
        
        if (Array.isArray(response.data?.message)) {
          setEvents(response.data.message);
          setFilteredEvents(response.data.message);
        } else {
          console.warn("Events data is not an array", response.data?.message);
          setEvents([]);
          setFilteredEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err.response?.data || err.message);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.theme?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchTerm, events]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="text-pink-500 text-5xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Upcoming Events</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover and book your spot at the most exciting events happening near you
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search events by title, location, or theme..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Events grid */}
        {!Array.isArray(filteredEvents) || filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-pink-500 text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {searchTerm ? "No events found" : "No events available"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {searchTerm 
                ? `We couldn't find any events matching "${searchTerm}"` 
                : "Check back later for new events coming soon!"
              }
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-400">
                Showing {filteredEvents.length} of {events.length} events
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="text-pink-500 hover:text-pink-400 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewEvents;
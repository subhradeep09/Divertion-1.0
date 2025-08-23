import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import organizerAxios from "../../utils/organizerAxios";
import OrganizerEventCard from "../OrganizerComponents/OrganizerEventCard";
import EventStatus from "./EventStatus";

const EventList = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [toEditEvents, setToEditEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const [upcomingRes, pastRes, toEditRes] = await Promise.all([
        organizerAxios.get("/events/upcoming"),
        organizerAxios.get("/events/past"),
        organizerAxios.get("/events/pending-Edit"),
      ]);

      // Include both APPROVED and PENDING events in upcoming list
      const upcomingData = Array.isArray(upcomingRes.data.message)
        ? upcomingRes.data.message.filter(
            (event) => event.status === "APPROVED" || event.status === "PENDING"
          )
        : [];

      const pastData = Array.isArray(pastRes.data.message) ? pastRes.data.message : [];

      const toEditData = Array.isArray(toEditRes.data.message) ? toEditRes.data.message : [];

      setUpcomingEvents(upcomingData);
      setPastEvents(pastData);
      setToEditEvents(toEditData);

      console.log("Upcoming events:", upcomingData);
      console.log("Past events:", pastData);
      console.log("To Edit events:", toEditData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch events");
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await organizerAxios.delete(`/dashboard/organizer/events/${eventId}`);
        // Optimistically update the state arrays by removing the deleted event
        setUpcomingEvents(prev => prev.filter(event => event._id !== eventId));
        setPastEvents(prev => prev.filter(event => event._id !== eventId));
        setToEditEvents(prev => prev.filter(event => event._id !== eventId));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete event");
        console.error("Failed to delete event", err);
      }
    }
  };

  const refreshEvents = () => {
    fetchEvents();
  };

  return (
    <div className="min-h-screen bg-gray-950 py-25 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Events</h1>
            <p className="text-gray-400">Manage all your events in one place</p>
          </div>
          <button
            onClick={() => navigate("/create-event")}
            className="mt-4 md:mt-0 bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create New Event
          </button>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 mb-8 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
              </svg>
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap border-b border-gray-700">
            <button
              className={`py-3 px-6 font-medium text-sm md:text-base ${activeTab === "upcoming" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Events
              <span className="ml-2 bg-gray-700 text-gray-300 text-xs py-1 px-2 rounded-full">
                {upcomingEvents.length}
              </span>
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm md:text-base ${activeTab === "past" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("past")}
            >
              Past Events
              <span className="ml-2 bg-gray-700 text-gray-300 text-xs py-1 px-2 rounded-full">
                {pastEvents.length}
              </span>
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm md:text-base ${activeTab === "toEdit" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("toEdit")}
            >
              To Edit Events
              <span className="ml-2 bg-gray-700 text-gray-300 text-xs py-1 px-2 rounded-full">
                {toEditEvents.length}
              </span>
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm md:text-base ${activeTab === "status" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("status")}
            >
              Event Status
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "upcoming" && (
          <div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse">
                    <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6 mb-4"></div>
                    <div className="h-10 bg-gray-800 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700">
                <div className="text-pink-500 text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No upcoming events</h3>
                <p className="text-gray-400 mb-6">You don't have any upcoming events yet.</p>
                <button 
                  onClick={() => navigate("/create-event")}
                  className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
                >
                  Create Your First Event
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <OrganizerEventCard
                    key={event._id}
                    event={event}
                    onDelete={() => handleDelete(event._id)}
                    onEdit={() => navigate(`/edit-event/${event._id}`)}
                    onRefresh={refreshEvents}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse">
                    <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6 mb-4"></div>
                    <div className="h-10 bg-gray-800 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : pastEvents.length === 0 ? (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700">
                <div className="text-pink-500 text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No past events</h3>
                <p className="text-gray-400">You don't have any past events yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <OrganizerEventCard
                    key={event._id}
                    event={event}
                    onDelete={() => handleDelete(event._id)}
                    onEdit={() => navigate(`/edit-event/${event._id}`)}
                    isPast
                    onRefresh={refreshEvents}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "toEdit" && (
          <div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse">
                    <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6 mb-4"></div>
                    <div className="h-10 bg-gray-800 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : toEditEvents.length === 0 ? (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700">
                <div className="text-pink-500 text-6xl mb-4">✏️</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No events to edit</h3>
                <p className="text-gray-400">All your events are up to date.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toEditEvents.map((event) => (
                  <OrganizerEventCard
                    key={event._id}
                    event={event}
                    onEdit={() => navigate(`/edit-event/${event._id}`)}
                    onRefresh={refreshEvents}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "status" && <EventStatus />}
      </div>
    </div>
  );
};

export default EventList;
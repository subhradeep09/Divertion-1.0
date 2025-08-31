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

  return (
    <div className="container mx-auto px-4 py-25 bg-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Events</h1>
        <button
          onClick={() => navigate("/create-event")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Create New Event
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex border-b border-gray-700">
          <button
            className={`py-2 px-4 font-medium ${activeTab === "upcoming" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "past" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("past")}
          >
            Past Events
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "toEdit" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("toEdit")}
          >
            To Edit Events
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "status" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("status")}
          >
            Event Status
          </button>
        </div>
      </div>

      {activeTab === "upcoming" && (
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-gray-400">Loading upcoming events...</p>
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="bg-gray-800 text-gray-400 p-6 rounded-lg">
              No upcoming events found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <OrganizerEventCard
                  key={event._id}
                  event={event}
                  onDelete={() => handleDelete(event._id)}
                  onEdit={() => navigate(`/edit-event/${event._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-gray-400">Loading past events...</p>
            </div>
          ) : pastEvents.length === 0 ? (
            <div className="bg-gray-800 text-gray-400 p-6 rounded-lg">
              No past events found.
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
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "toEdit" && (
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-gray-400">Loading to edit events...</p>
            </div>
          ) : toEditEvents.length === 0 ? (
            <div className="bg-gray-800 text-gray-400 p-6 rounded-lg">
              No to edit events found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toEditEvents.map((event) => (
                <OrganizerEventCard
                  key={event._id}
                  event={event}
                  onEdit={() => navigate(`/edit-event/${event._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "status" && <EventStatus />}
    </div>
  );
};

export default EventList;
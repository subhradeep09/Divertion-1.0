import OrganizerEventCard from '../OrganizerComponents/OrganizerEventCard';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { organizerAxios } from '../../utils/axiosInstance';

const EventList = () => {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const upcomingRes = await organizerAxios.get('/events/upcoming');
        const pastRes = await organizerAxios.get('/events/past');

        const upcomingData = upcomingRes?.data?.message;
        const pastData = pastRes?.data?.message;

        setUpcomingEvents(Array.isArray(upcomingData) ? upcomingData : []);
        setPastEvents(Array.isArray(pastData) ? pastData : []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setUpcomingEvents([]);
        setPastEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    // console.log('Delete button clicked for event:', eventId);
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      // console.log(`Sending DELETE request to /events/${eventId}`);
      const response = await organizerAxios.delete(`/events/${eventId}`);
      // console.log('Response status:', response?.status);
      // console.log('Response data:', response?.data);

      if (response?.status === 200) {
        // Refetch events to update UI
        const upcomingRes = await organizerAxios.get('/events/upcoming');
        const pastRes = await organizerAxios.get('/events/past');

        const upcomingData = upcomingRes?.data?.message;
        const pastData = pastRes?.data?.message;

        setUpcomingEvents(Array.isArray(upcomingData) ? upcomingData : []);
        setPastEvents(Array.isArray(pastData) ? pastData : []);
      } else {
        console.error('Failed to delete event. Status:', response?.status);
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div className="px-8 py-10 min-h-40 ">
      <h2 className="text-white text-xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <OrganizerEventCard
              key={event._id}
              event={event}
              price={event.price}
              onEdit={() => navigate(`/update-event/${event._id}`)}
              onDelete={() => handleDelete(event._id)}
            />
          ))
        ) : (
          <div className="text-white text-center col-span-full">
            No upcoming events found.
          </div>
        )}
      </div>

      <h2 className="text-white text-xl font-bold mb-4">Past Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <OrganizerEventCard
              key={event._id}
              event={event}
              price={event.price}
              onEdit={() => navigate(`/update-event/${event._id}`)}
              onDelete={() => handleDelete(event._id)}
            />
          ))
        ) : (
          <div className="text-white text-center col-span-full">
            No past events found.
          </div>
        )}
      </div>

      <div
        onClick={() => navigate('/create-event')}
        className="flex items-center justify-center bg-[#2a2a2a] text-white border-2 border-dashed border-pink-500 rounded-lg cursor-pointer hover:bg-[#333] transition duration-300"
        style={{ minHeight: '300px' }}
      >
        <span className="text-lg font-semibold">+ Create New Event</span>
      </div>
    </div>
  );
};

export default EventList;
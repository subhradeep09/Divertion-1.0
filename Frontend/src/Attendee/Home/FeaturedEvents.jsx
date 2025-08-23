import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../Events/EventCard';
import attendeeAxios from '../../utils/attendeeAxios';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await attendeeAxios.get('/events/view-Events');
        setEvents(response.data.message.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="relative px-6 py-24 bg-gradient-to-br from-pink-500 via-pink-600 to-fuchsia-700 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-300 mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-400 mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-600 uppercase bg-pink-200 rounded-full">
            Premium Events
          </span>
          <h2 className="text-5xl font-bold text-white mb-4 font-serif">Featured Experiences</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-16">
          <button 
            onClick={() => navigate('/view-events')}
            className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-pink-600 font-medium rounded-full transition-all duration-300"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
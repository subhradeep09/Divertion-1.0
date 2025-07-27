

import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      // Simulated API response
      const dummyEvents = [
        {
          id: 1,
          image: 'https://source.unsplash.com/featured/?music,concert',
          title: 'Live Music at Sunset Club',
          date: 'August 2, 2025',
          location: 'New York, NY',
          tags: ['Music', 'Live'],
          price: '$25'
        },
        {
          id: 2,
          image: 'https://source.unsplash.com/featured/?technology,conference',
          title: 'Tech Talk: Future of AI',
          date: 'August 10, 2025',
          location: 'San Francisco, CA',
          tags: ['Tech', 'Seminar'],
          price: 'Free'
        },
        {
          id: 3,
          image: 'https://source.unsplash.com/featured/?art,wine',
          title: 'Art & Wine Night',
          date: 'August 5, 2025',
          location: 'Austin, TX',
          tags: ['Art', 'Culture'],
          price: '$40'
        },
      ];
      setEvents(dummyEvents);
    };

    fetchEvents();
  }, []);

  return (
    <section className="relative px-6 py-24 bg-gradient-to-br from-pink-500 via-fuchsia-600 to-purple-700 overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-300 mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-400 mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-600 uppercase bg-purple-200 rounded-full">
            Nearby Events
          </span>
          <h2 className="text-5xl font-bold text-white mb-4 font-serif">Upcoming Events Near You</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-purple-700 font-medium rounded-full transition-all duration-300">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
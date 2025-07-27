import React from 'react';
import EventCard from '../../components/EventCard';

const featuredEvents = [
  {
    id: 1,
    image: '/assets/event1.jpg',
    title: 'Tech Innovation Summit',
    date: 'August 30, 2025',
    location: 'San Francisco, CA',
    tags: ['Tech', 'Conference'],
    price: '$299'
  },
  {
    id: 2,
    image: '/assets/event2.jpg',
    title: 'Jazz & Blues Night',
    date: 'September 12, 2025',
    location: 'New Orleans, LA',
    tags: ['Music', 'Live'],
    price: '$149'
  },
  {
    id: 3,
    image: '/assets/event3.jpg',
    title: 'Art & Craft Fair',
    date: 'September 25, 2025',
    location: 'Austin, TX',
    tags: ['Arts', 'Exhibition'],
    price: '$79'
  },
];

const FeaturedEvents = () => {
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
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-pink-600 font-medium rounded-full transition-all duration-300">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
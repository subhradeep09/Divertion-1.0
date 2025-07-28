

import React from 'react';
import EventCard from '../../components/EventCard';

const dummyEvents = [
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
  {
    id: 4,
    image: '/assets/event1.jpg',
    title: 'Tech Innovation Summit',
    date: 'August 30, 2025',
    location: 'San Francisco, CA',
    tags: ['Tech', 'Conference'],
    price: '$299'
  },
  {
    id: 5,
    image: '/assets/event2.jpg',
    title: 'Jazz & Blues Night',
    date: 'September 12, 2025',
    location: 'New Orleans, LA',
    tags: ['Music', 'Live'],
    price: '$149'
  },
  {
    id: 6,
    image: '/assets/event3.jpg',
    title: 'Art & Craft Fair',
    date: 'September 25, 2025',
    location: 'Austin, TX',
    tags: ['Arts', 'Exhibition'],
    price: '$79'
  },
];

const EventsListing = () => {
  return (
    <div className="px-6 md:px-12 py-12  min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-10 text-center font-serif">Browse Events</h2>
        {dummyEvents.length === 0 ? (
          <div className="text-center text-white text-lg">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsListing;
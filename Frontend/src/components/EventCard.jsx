// src/components/EventCard.jsx
import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div 
      className="group relative bg-pink-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-pink-400/60 transition-all duration-500"
    >
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 text-xs font-bold text-white uppercase bg-gradient-to-r from-pink-400 to-pink-600 rounded-full shadow-lg">
          Featured
        </span>
      </div>

      <div className="relative h-72 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white font-serif">{event.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-pink-200 font-medium">{event.price}</span>
            <span className="text-pink-100 text-sm">{event.date.split(',')[0]}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-700">{event.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-3 py-1 rounded-full bg-pink-200 text-pink-800 border border-pink-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="w-full py-3 px-6 bg-pink-100 text-pink-700 hover:bg-pink-200 font-medium rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
          <span>Get Tickets</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default EventCard;
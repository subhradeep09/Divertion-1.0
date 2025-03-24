import React from "react";

const previousEvents = [
  {
    id: 1,
    name: "Tech Innovation Summit 2024",
    date: "March 15, 2024",
    place: "Silicon Valley",
    attendees: "500+ Attendees",
    image: "https://source.unsplash.com/400x300/?technology,conference",
  },
  {
    id: 2,
    name: "Digital Transformation Forum",
    date: "February 28, 2024",
    place: "Chicago Tech Hub",
    attendees: "300+ Attendees",
    image: "https://source.unsplash.com/400x300/?business,seminar",
  },
  {
    id: 3,
    name: "Future of AI Conference",
    date: "February 10, 2024",
    place: "Boston Innovation Center",
    attendees: "400+ Attendees",
    image: "https://source.unsplash.com/400x300/?AI,conference",
  },
  {
    id: 4,
    name: "Data Science Summit",
    date: "January 25, 2024",
    place: "Austin Convention Center",
    attendees: "450+ Attendees",
    image: "https://source.unsplash.com/400x300/?data,conference",
  },
  {
    id: 5,
    name: "Cloud Tech Expo",
    date: "January 10, 2024",
    place: "Seattle Tech Campus",
    attendees: "600+ Attendees",
    image: "https://source.unsplash.com/400x300/?cloud,conference",
  },
];

const PreviousEvents = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-4">✨ Previous Events ✨</h2>
      <p className="text-center text-gray-400 mb-6">Take a look at our past successful events and their highlights.</p>
      <div className="flex flex-col space-y-6">
        {previousEvents.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row md:items-center hover:scale-105 transition-transform">
            <img src={event.image} alt={event.name} className="w-full md:w-1/3 h-48 object-cover" />
            <div className="p-5 flex-1">
              <h3 className="text-xl font-bold text-white">{event.name}</h3>
              <p className="text-gray-400 mt-1">📅 {event.date}</p>
              <p className="text-gray-400">📍 {event.place}</p>
              <p className="text-blue-400 font-medium mt-2">{event.attendees}</p>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousEvents;

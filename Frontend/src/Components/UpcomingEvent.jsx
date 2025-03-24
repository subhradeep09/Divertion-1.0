import React from "react";

const events = [
  {
    id: 1,
    name: "AI Summit 2025",
    date: "April 15, 2025",
    time: "9:00 AM - 5:00 PM",
    place: "Tech Convention Center, San Francisco",
    price: "$299",
    image: "https://source.unsplash.com/400x250/?conference,technology",
    availability: "Limited spots available"
  },
  {
    id: 2,
    name: "Blockchain Revolution Conference",
    date: "April 28, 2025",
    time: "10:00 AM - 6:00 PM",
    place: "Innovation Hub, New York",
    price: "$349",
    image: "https://source.unsplash.com/400x250/?blockchain,conference",
    availability: "Early bird pricing ends soon"
  },
  {
    id: 3,
    name: "Cloud Computing Workshop",
    date: "May 5, 2025",
    time: "2:00 PM - 6:00 PM",
    place: "Virtual Event",
    price: "$149",
    image: "https://source.unsplash.com/400x250/?cloud,technology",
    availability: "Virtual seats available"
  },
  {
    id: 4,
    name: "Cyber Security Summit",
    date: "May 20, 2025",
    time: "10:00 AM - 4:00 PM",
    place: "London, UK",
    price: "$249",
    image: "https://source.unsplash.com/400x250/?cybersecurity,conference",
    availability: "Register before May 10"
  },
  {
    id: 5,
    name: "AI & ML Bootcamp",
    date: "June 10, 2025",
    time: "8:00 AM - 3:00 PM",
    place: "Berlin, Germany",
    price: "$199",
    image: "https://source.unsplash.com/400x250/?AI,workshop",
    availability: "Few spots left!"
  }
];

const UpcomingEvents = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-4">🚀 Upcoming Events 🚀</h2>
      <p className="text-center text-gray-400 mb-6">Join us for these exciting upcoming technology conferences and workshops.</p>
      <div className="flex flex-col space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row md:items-center hover:scale-105 transition-transform">
            <img src={event.image} alt={event.name} className="w-full md:w-1/3 h-48 object-cover" />
            <div className="p-5 flex-1">
              <h3 className="text-xl font-bold text-white">{event.name}</h3>
              <p className="text-gray-400 mt-1">📅 {event.date} | ⏰ {event.time}</p>
              <p className="text-gray-400">📍 {event.place}</p>
              <p className="text-blue-400 font-medium mt-2">{event.availability}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">{event.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;

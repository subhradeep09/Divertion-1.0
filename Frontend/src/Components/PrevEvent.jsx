import React from "react";
import { useNavigate } from "react-router-dom";
const previousEvents = [
  {
    id: 1,
    name: "Tech Innovation Summit 2024",
    date: "March 15, 2024",
    place: "Silicon Valley",
    attendees: "500+ Attendees",
    image: "https://images.pexels.com/photos/2897462/pexels-photo-2897462.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Digital Transformation Forum",
    date: "February 28, 2024",
    place: "Chicago Tech Hub",
    attendees: "300+ Attendees",
    image: "https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Future of AI Conference",
    date: "February 10, 2024",
    place: "Boston Innovation Center",
    attendees: "400+ Attendees",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Data Science Summit",
    date: "January 25, 2024",
    place: "Austin Convention Center",
    attendees: "450+ Attendees",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Cloud Tech Expo",
    date: "January 10, 2024",
    place: "Seattle Tech Campus",
    attendees: "600+ Attendees",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Cybersecurity Conference",
    date: "December 18, 2023",
    place: "New York City",
    attendees: "550+ Attendees",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    name: "Blockchain Expo",
    date: "November 12, 2023",
    place: "San Francisco",
    attendees: "480+ Attendees",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    name: "IoT World Summit",
    date: "October 5, 2023",
    place: "Los Angeles",
    attendees: "420+ Attendees",
    image: "https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const PreviousEvents = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-8xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          Previous Events
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Explore our successful past events that brought together industry leaders and innovators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {previousEvents.map((event) => (
          <div
            key={event.id}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {event.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">📅 {event.date}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">📍 {event.place}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {event.attendees}
              </p>
              <button onClick={()=>navigate ("/EventDetails", { state: event })} className="px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousEvents;

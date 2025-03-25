import React from "react";

const upcomingEvents = [
  {
    id: 1,
    name: "AI & Machine Learning Conference",
    date: "April 10, 2025",
    place: "San Francisco, CA",
    attendees: "700+ Expected",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Next-Gen Cloud Symposium",
    date: "May 22, 2025",
    place: "Seattle, WA",
    attendees: "850+ Expected",
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Blockchain Future Expo",
    date: "June 15, 2025",
    place: "Austin, TX",
    attendees: "600+ Expected",
    image: "https://images.pexels.com/photos/5989927/pexels-photo-5989927.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Cybersecurity World Summit",
    date: "July 8, 2025",
    place: "New York, NY",
    attendees: "900+ Expected",
    image: "https://images.pexels.com/photos/7319063/pexels-photo-7319063.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "IoT & Smart Devices Forum",
    date: "August 12, 2025",
    place: "Los Angeles, CA",
    attendees: "500+ Expected",
    image: "https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Digital Health Tech Summit",
    date: "September 20, 2025",
    place: "Boston, MA",
    attendees: "750+ Expected",
    image: "https://images.pexels.com/photos/7089024/pexels-photo-7089024.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    name: "5G & Future Connectivity Expo",
    date: "October 5, 2025",
    place: "Chicago, IL",
    attendees: "800+ Expected",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    name: "Green Tech Innovation Forum",
    date: "November 18, 2025",
    place: "Denver, CO",
    attendees: "650+ Expected",
    image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600",
  }
];

const UpcomingEvents = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          Upcoming Events
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Stay updated with our upcoming events where technology meets innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {upcomingEvents.map((event) => (
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
              <button className="px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
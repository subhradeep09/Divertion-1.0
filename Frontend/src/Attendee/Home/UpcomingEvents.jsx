import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../Bookings/BookingCard';
import attendeeAxios from '../../utils/attendeeAxios';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await attendeeAxios.get('/events/upcoming-Booked-Events');
        setEvents(response.data?.message || []);
      } catch (error) {
        console.error('Error fetching upcoming booked events:', error);
        setError('Failed to load upcoming events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="relative px-6 py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-500 mix-blend-soft-light filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-600 mix-blend-soft-light filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-300 uppercase bg-pink-900 bg-opacity-30 rounded-full">
              Your Events
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">Upcoming Booked Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-opacity-50 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
                <div className="h-10 bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative px-6 py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-500 mix-blend-soft-light filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-600 mix-blend-soft-light filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-300 uppercase bg-pink-900 bg-opacity-30 rounded-full">
              Your Events
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">Upcoming Booked Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700 border-opacity-50">
            <div className="text-pink-500 text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-semibold text-white mb-2">Something went wrong</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!events.length) {
    return (
      <section className="relative px-6 py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-500 mix-blend-soft-light filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-600 mix-blend-soft-light filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-300 uppercase bg-pink-900 bg-opacity-30 rounded-full">
              Your Events
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">Upcoming Booked Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700 border-opacity-50">
            <div className="text-pink-500 text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No upcoming events</h3>
            <p className="text-gray-300 mb-6">You haven't booked any events yet.</p>
            <button 
              onClick={() => navigate('/events')}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
            >
              Browse Events
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-500 mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-600 mix-blend-soft-light filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-300 uppercase bg-pink-900 bg-opacity-30 rounded-full">
            Your Events
          </span>
          <h2 className="text-5xl font-bold text-white mb-4">Upcoming Booked Events</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the exciting events you've booked and get ready for an amazing experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 3).map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>

        {events.length > 3 && (
          <div className="text-center mt-16">
            <button
              className="px-8 py-3 border-2 border-pink-500 text-pink-300 hover:bg-pink-600 hover:text-white font-medium rounded-full transition-all duration-300"
              onClick={() => navigate('/upcoming-bookings')}
            >
              View All {events.length} Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
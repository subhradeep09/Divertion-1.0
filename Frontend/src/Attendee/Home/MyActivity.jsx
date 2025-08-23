import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import attendeeAxios from '../../utils/attendeeAxios';

const MyActivity = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch upcoming bookings
        const upcomingResponse = await attendeeAxios.get('/events/upcoming-Booked-Events');
        setUpcomingBookings(upcomingResponse.data?.message || []);
        
        // Fetch booking history
        const historyResponse = await attendeeAxios.get('/events/booking-History');
        setBookingHistory(historyResponse.data?.message || []);
        
      } catch (err) {
        console.error('Error fetching activity data:', err);
        setError('Failed to load your activity data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Date not available";
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <section className="relative px-6 py-16 md:py-20 bg-gradient-to-br from-[#111113] via-[#1c1c1f] to-[#111113] text-white overflow-hidden min-h-screen">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{ filter: 'blur(120px)' }}></div>
        <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{ filter: 'blur(100px)' }}></div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{ filter: 'blur(90px)' }}></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-300 uppercase bg-pink-900 bg-opacity-30 rounded-full">
              Your Dashboard
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">My Activity</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white/5 backdrop-blur-md border border-pink-600/30 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-6 bg-gray-700 rounded w-32"></div>
                  </h3>
                  <div className="h-4 bg-gray-700 rounded w-16"></div>
                </div>
                <ul className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative px-6 py-16 md:py-20 bg-gradient-to-br from-[#111113] via-[#1c1c1f] to-[#111113] text-white overflow-hidden min-h-screen">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{ filter: 'blur(120px)' }}></div>
        <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{ filter: 'blur(100px)' }}></div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{ filter: 'blur(90px)' }}></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-300 uppercase bg-pink-900 bg-opacity-30 rounded-full">
              Your Dashboard
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">My Activity</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-pink-600/30 rounded-2xl p-12 text-center">
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

  return (
    <section className="relative px-6 py-16 md:py-20 bg-gradient-to-br from-[#111113] via-[#1c1c1f] to-[#111113] text-white overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{ filter: 'blur(120px)' }}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{ filter: 'blur(100px)' }}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{ filter: 'blur(90px)' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-300 uppercase bg-pink-900 bg-opacity-30 rounded-full">
            Your Dashboard
          </span>
          <h2 className="text-5xl font-bold text-white mb-4">My Activity</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Overview of your upcoming events and booking history
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Upcoming Bookings */}
          <div className="bg-white/5 backdrop-blur-md border border-pink-600/30 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a1 1 0 00-1 1v3h14V4a1 1 0 00-1-1H4zM3 8v8a1 1 0 001 1h12a1 1 0 001-1V8H3z"/>
                </svg>
                Upcoming Events
              </h3>
              <Link 
                to="/upcoming-bookings" 
                className="text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            {upcomingBookings.length === 0 ? (
              <div className="bg-white/10 p-6 rounded-xl border border-white/10 text-center">
                <div className="text-pink-500 text-4xl mb-3">🎭</div>
                <p className="text-gray-300">No upcoming events</p>
                <Link 
                  to="/events" 
                  className="inline-block mt-3 px-4 py-2 text-sm bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                >
                  Browse Events
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <li key={booking._id} className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
                    <h4 className="font-semibold text-lg mb-1">{booking.event?.title || "Untitled Event"}</h4>
                    <p className="text-sm text-white/70">
                      {booking.event?.date ? formatDate(booking.event.date) : "Date not available"} • {booking.event?.location || "Location TBA"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Booking History */}
          <div className="bg-white/5 backdrop-blur-md border border-purple-600/30 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v12l-6-3-6 3V5z"/>
                </svg>
                Booking History
              </h3>
              <Link 
                to="/booking-history" 
                className="text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            {bookingHistory.length === 0 ? (
              <div className="bg-white/10 p-6 rounded-xl border border-white/10 text-center">
                <div className="text-pink-500 text-4xl mb-3">📝</div>
                <p className="text-gray-300">No booking history yet</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {bookingHistory.slice(0, 3).map((booking) => (
                  <li key={booking._id} className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
                    <h4 className="font-semibold text-lg mb-1">{booking.event?.title || "Untitled Event"}</h4>
                    <p className="text-sm text-white/70">
                      {booking.event?.date ? formatDate(booking.event.date) : "Date not available"} • {booking.event?.location || "Location TBA"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-md border border-pink-600/30 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">{upcomingBookings.length}</div>
            <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
            <p className="text-sm text-gray-300">Events you're attending</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-purple-600/30 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{bookingHistory.length}</div>
            <h3 className="text-lg font-semibold text-white">Total Bookings</h3>
            <p className="text-sm text-gray-300">All your event bookings</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-blue-600/30 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {bookingHistory.filter(booking => new Date(booking.event?.date) < new Date()).length}
            </div>
            <h3 className="text-lg font-semibold text-white">Past Events</h3>
            <p className="text-sm text-gray-300">Events you've attended</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyActivity;
import React from 'react';
import { Link } from 'react-router-dom';

const MyActivity = () => {
  const upcomingTickets = [
    { id: 1, title: 'Jazz Night Live', date: 'Aug 3, 2025', location: 'New York' },
    { id: 2, title: 'Tech Future Summit', date: 'Aug 10, 2025', location: 'San Francisco' },
    { id: 3, title: 'Yoga in the Park', date: 'Aug 12, 2025', location: 'Chicago' },
  ];

  const savedEvents = [
    { id: 101, title: 'Artisan Market' },
    { id: 102, title: 'Startup Meetup' },
    { id: 103, title: 'Coding Bootcamp' },
  ];

  return (
    <section className="relative px-6 py-16 md:py-20 bg-gradient-to-br from-[#111113] via-[#1c1c1f] to-[#111113] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{ filter: 'blur(120px)' }}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{ filter: 'blur(100px)' }}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{ filter: 'blur(90px)' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-600 uppercase bg-pink-200 rounded-full">
            Your Dashboard
          </span>
          <h2 className="text-5xl font-bold text-white mb-4 font-serif">My Activity</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Upcoming Tickets */}
          <div className="bg-white/5 backdrop-blur-md border border-pink-600/30 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a1 1 0 00-1 1v3h14V4a1 1 0 00-1-1H4zM3 8v8a1 1 0 001 1h12a1 1 0 001-1V8H3z"/></svg>
                Upcoming Tickets
              </h3>
              <Link to="/my-tickets" className="text-sm font-medium text-pink-400 hover:underline">View All</Link>
            </div>
            <ul className="space-y-4">
              {upcomingTickets.map((ticket) => (
                <li key={ticket.id} className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
                  <h4 className="font-semibold text-lg">{ticket.title}</h4>
                  <p className="text-sm text-white/70">{ticket.date} • {ticket.location}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Saved Events */}
          <div className="bg-white/5 backdrop-blur-md border border-purple-600/30 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v12l-6-3-6 3V5z"/></svg>
                Saved Events
              </h3>
              <Link to="/saved-events" className="text-sm font-medium text-pink-400 hover:underline">View All</Link>
            </div>
            <ul className="space-y-4">
              {savedEvents.map((event) => (
                <li key={event.id} className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyActivity;
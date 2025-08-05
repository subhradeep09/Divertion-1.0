import React from 'react';
import EventStats from './EventOverview';
import OrganizerEventList from './EventList';
import EventCalendar from '../../components/Calendar';

const MyEvents = () => {
  return (
    <div className="relative px-6 md:px-10 py-30 space-y-12 bg-[#0f0c29] min-h-screen text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{ filter: 'blur(120px)' }}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-fuchsia-500 opacity-25 blur-3xl z-0" style={{ filter: 'blur(100px)' }}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{ filter: 'blur(90px)' }}></div>
      {/* Overview Stats */}
      <section>
        <h2 className="text-3xl font-bold mb-6 font-serif">Event Overview</h2>
        <EventStats />
      </section>

      {/* Filter + Event List */}
      <section>
        <OrganizerEventList />
      </section>

      {/* Calendar View */}
      <section>
        <h2 className="text-3xl font-bold mb-6 font-serif">Event Calendar</h2>
        <EventCalendar />
      </section>
    </div>
  );
};

export default MyEvents;
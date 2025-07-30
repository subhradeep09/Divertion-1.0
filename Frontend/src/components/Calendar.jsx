import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const mockEvents = [
  {
    id: 1,
    title: 'My Event: Workshop on AI',
    start: new Date(2025, 7, 2, 10, 0),
    end: new Date(2025, 7, 2, 12, 0),
    organizer: 'me',
  },
  {
    id: 2,
    title: 'Other Organizer: Music Fest',
    start: new Date(2025, 7, 2, 11, 0),
    end: new Date(2025, 7, 2, 13, 0),
    organizer: 'other',
  },
  {
    id: 3,
    title: 'My Event: Tech Meetup',
    start: new Date(2025, 7, 4, 9, 0),
    end: new Date(2025, 7, 4, 11, 0),
    organizer: 'me',
  },
];

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.organizer === 'me' ? '#ec4899' : '#3b82f6';
    return {
      style: {
        backgroundColor,
        borderRadius: '10px',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 0 12px rgba(236, 72, 153, 0.5)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      },
      className: 'hover:shadow-pink-500/70 hover:scale-105',
    };
  };

  const handleEventSelect = (event) => {
    alert(`Selected Event:\n${event.title}`);
  };

  return (
    <div className="p-8 rounded-2xl min-h-screen bg-gradient-to-br from-black via-gray-900 to-black shadow-inner shadow-pink-700/20 border border-pink-600/20">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-pink-400 drop-shadow-md transition duration-300 hover:text-pink-300 cursor-pointer">
        Event Calendar
      </h2>
      <div className="rounded-lg overflow-hidden border border-gray-800 shadow-lg bg-black/20">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelect}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          components={{
            toolbar: (props) => (
              <div className="rbc-toolbar flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-black text-white">
                <div className="rbc-btn-group space-x-2">
                  <button onClick={() => props.onNavigate('TODAY')} className="px-3 py-1 bg-pink-500 hover:bg-pink-600 rounded">
                    Today
                  </button>
                  <button onClick={() => props.onNavigate('PREV')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded">
                    Back
                  </button>
                  <button onClick={() => props.onNavigate('NEXT')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded">
                    Next
                  </button>
                </div>
                <span className="text-lg font-semibold">{props.label}</span>
                <div className="rbc-btn-group space-x-2">
                  <button onClick={() => props.onView('month')} className="px-3 py-1 bg-pink-500 hover:bg-pink-600 rounded">
                    Month
                  </button>
                  <button onClick={() => props.onView('week')} className="px-3 py-1 bg-pink-500 hover:bg-pink-600 rounded">
                    Week
                  </button>
                  <button onClick={() => props.onView('day')} className="px-3 py-1 bg-pink-500 hover:bg-pink-600 rounded">
                    Day
                  </button>
                  <button onClick={() => props.onView('agenda')} className="px-3 py-1 bg-pink-500 hover:bg-pink-600 rounded">
                    Agenda
                  </button>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
import OrganizerEventCard from '../OrganizerComponents/OrganizerEventCard';

import React from 'react';
import { useNavigate } from 'react-router-dom';


const EventList = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      banner: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg',
      dateTime: 'August 22, 2025 - 10:00 AM',
      location: 'San Francisco, CA',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Art Exhibition',
      banner: 'https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg',
      dateTime: 'September 10, 2025 - 02:00 PM',
      location: 'New York, NY',
      status: 'Draft',
    }
  ];

  return (
    <div className="px-8 py-10 min-h-40 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {events.map((event) => (
          <OrganizerEventCard key={event.id} event={event} />
        ))}

        <div
          onClick={() => navigate('/organizer/create-event')}
          className="flex items-center justify-center bg-[#2a2a2a] text-white border-2 border-dashed border-pink-500 rounded-lg cursor-pointer hover:bg-[#333] transition duration-300"
          style={{ minHeight: '300px' }}
        >
          <span className="text-lg font-semibold">+ Create New Event</span>
        </div>
      </div>
    </div>
  );
};

export default EventList;
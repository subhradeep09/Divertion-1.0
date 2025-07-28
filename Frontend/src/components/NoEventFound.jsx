import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCalendar } from 'react-icons/hi';

const NoEventFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-10  text-white">
      <div className="mb-6 text-pink-500">
        <HiOutlineCalendar className="text-7xl" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">No Events Found</h2>
      <p className="text-lg mb-6 text-gray-300">
        We couldn’t find any events matching your search or filters.
      </p>
      <Link
        to="/events"
        className="inline-block px-6 py-3 text-white bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 rounded-full font-medium shadow-lg transition"
      >
        Browse All Events
      </Link>
    </div>
  );
};

export default NoEventFound;
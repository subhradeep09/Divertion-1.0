

import React from 'react';
import HeroSection from './Hero';
import FeaturedEventsCarousel from './FeaturedEvents';
import CategoriesGrid from './CategoryGrid';
import UpcomingEvents from './UpcomingEvents';
import MyActivity from './MyActivity';

const HomeAttendee = () => {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <HeroSection />
      <FeaturedEventsCarousel />
      <CategoriesGrid />
      <UpcomingEvents />
      <MyActivity />
    </div>
  );
};

export default HomeAttendee;
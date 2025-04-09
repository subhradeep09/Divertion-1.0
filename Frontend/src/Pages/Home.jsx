import React from "react";
import UpcomingEvents from "../Components/UpcomingEvent";
import PreviousEvents from "../Components/PrevEvent";
import HeroSection from "../Components/Herosection";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <HeroSection />
      <UpcomingEvents />
      <PreviousEvents />
    </div>
  );
};

export default Home;

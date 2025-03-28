import React from "react";
import UpcomingEvents from "../Components/UpcomingEvent";
import PreviousEvents from "../Components/PrevEvent";
import HeroSection from "../Components/Herosection";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <HeroSection />
      <UpcomingEvents />
      <PreviousEvents />
    </div>
  );
};

export default Home;
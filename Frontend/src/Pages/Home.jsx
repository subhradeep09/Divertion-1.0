import React from "react";
import UpcomingEvents from "../Components/UpcomingEvent";
import PreviousEvents from "../Components/PrevEvent";
import HeroSection from "../Components/Herosection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <UpcomingEvents />
      <div className="my-12"></div>
      <PreviousEvents />
    </div>
  );
};

export default Home;
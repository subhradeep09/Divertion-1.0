import React from "react";
import UpcomingEvents from "../Components/UpcomingEvent";
import PreviousEvents from "../Components/PrevEvent";

const Home = () => {
  return (
    <div>
      <UpcomingEvents />
      <div className="my-12"></div>
      <PreviousEvents />
    </div>
  );
};

export default Home;
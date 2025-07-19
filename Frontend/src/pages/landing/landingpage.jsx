import React from 'react';
import Hero from './hero';
import About from './about';
import Upcoming from './upcoming';
import Howwork from './howitworks';
import Features from './featuressection';

const LandingPage = () => (
  <main className="w-full min-h-screen bg-black">
    <Hero />
    <About />
    <Upcoming />
    <Howwork />
    <Features />
  </main>
);

export default LandingPage; 
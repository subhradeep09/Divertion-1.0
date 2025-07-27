import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-black text-white min-h-screen flex flex-col justify-end px-6 md:px-16 overflow-hidden">
      <div className="hidden md:block absolute inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/4916813/4916813-hd_1920_1080_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 py-12 mt-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-pink-400">Discover</span> <span className="text-white">Events That Inspire You</span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl mb-8">
          Browse concerts, meetups, workshops, and more near you.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search events by name, type, or city"
            className="w-full md:w-96 px-6 py-3 rounded-full bg-[#1e1e21] text-white placeholder-white/40 border border-[#2e2e32] focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-transform hover:scale-105 shadow-md"
          >
            🔍 Browse Events
          </button>
          <button
            onClick={() => navigate('/my-tickets')}
            className="px-6 py-3 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-transform hover:scale-105"
          >
            🗓 My Tickets
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
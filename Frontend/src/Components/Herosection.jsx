import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative w-full flex flex-col dark:bg-gray-900">
      {/* Video Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
            preload="auto"
          >
            <source
              src="https://videos.pexels.com/video-files/26744649/11999035_1920_1080_25fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl mb-8">
            Crafting Extraordinary <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Event Experiences
            </span>
          </h1>

          {/* Address Appraisal Section */}
          <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-full shadow-xl border border-white/40 p-1 mb-8">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter venue address..."
                className="flex-1 px-6 py-4 text-white bg-white/10 outline-none text-lg placeholder-white/80 rounded-l-full"
              />
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-600 px-6 py-4 text-white font-bold rounded-full transition-all duration-300 flex items-center gap-2">
                <span>Appraise</span>
                <FiArrowRight className="text-lg" />
              </button>
            </div>
          </div>

          {/* Get Started Button - Now using Link component */}
          <Link 
            to="/events"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg transition-all duration-300 hover:bg-white hover:text-orange-500 hover:shadow-xl"
          >
            Get Started
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Cards Section - Outside Video Frame */}
      <div className="w-full bg dark:bg-black dark:bg-gradient-to-b dark:from-gray-900 dark:to-black py-20 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            Why Choose Our Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Floating Review Card */}
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 text-white p-8 rounded-2xl shadow-xl text-left hover:scale-105 transition-transform duration-300 border border-purple-300 dark:border-purple-700">
              <p className="text-2xl font-semibold mb-4">🏢 Professional Company</p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">⭐ 4.9</span>
                <span className="text-lg">(5.8k reviews)</span>
              </div>
            </div>

            {/* 24-Hour Consultation Box */}
            <div className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 p-8 rounded-2xl shadow-xl flex items-center gap-4 hover:scale-105 transition-transform duration-300 border border-green-300 dark:border-green-700">
              <div className="bg-yellow-500 p-6 rounded-full text-3xl">⏳</div>
              <div>
                <p className="font-semibold text-white text-2xl">24-Hour Consultation</p>
                <p className="text-gray-200 text-lg">Serving in various countries</p>
              </div>
            </div>

            {/* Floating User Count */}
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800 text-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300 border border-orange-300 dark:border-orange-700">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-600 rounded-full border-4 border-white overflow-hidden">
                  <img
                    src="https://source.unsplash.com/100x100/?man,portrait"
                    alt="User 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-20 h-20 bg-gray-600 rounded-full border-4 border-white overflow-hidden">
                  <img
                    src="https://source.unsplash.com/100x100/?man,face"
                    alt="User 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="font-semibold text-3xl">2k+ Users</div>
            </div>

            {/* Floating Success Text */}
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 p-8 rounded-2xl shadow-xl border border-blue-300 dark:border-blue-700 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-white font-semibold text-2xl">
                ✅ People Successfully Getting Home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

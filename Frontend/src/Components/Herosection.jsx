import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center text-center px-6 md:px-16 py-12">
      {/* Title & Description Section */}
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mt-6 md:mt-12">
          Building New <br />
          <span className="text-gray-900">Event Vision</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mt-4 text-lg mx-auto">
        We are an event management agency dedicated to crafting unforgettable experiences 
        with seamless planning and execution. Let's create something extraordinary together.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="relative mt-10 bg-white shadow-lg rounded-lg flex items-center p-4 w-full max-w-lg gap-3 border border-gray-300">
        <input
          type="text"
          placeholder="Enter your address..."
          className="flex-1 px-4 py-3 text-gray-700 bg-transparent outline-none"
        />
        <button className="bg-yellow-500 px-6 py-3 text-white font-bold rounded-lg hover:bg-yellow-600 transition">
          Appraise
        </button>
      </div>

      {/* Image Section */}
      <div className="relative w-full max-w-5xl mt-16">
        <div className="rounded-2xl shadow-xl overflow-hidden">
          <img
            src="https://source.unsplash.com/1200x600/?modern,architecture"
            alt="Modern Architecture"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Floating Elements Section */}
      <div className="relative w-full max-w-5xl mt-10 flex flex-wrap justify-center gap-8">
        {/* Floating Review Card */}
        <div className="bg-red-500 text-white p-4 rounded-xl shadow-lg text-left w-56">
          <p className="text-sm font-semibold">🏢 Professional Company</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold">⭐ 4.9</span>
            <span className="text-xs">(5.8k reviews)</span>
          </div>
        </div>

        {/* 24-Hour Consultation Box */}
        <div className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-4 w-64 border border-gray-200">
          <div className="bg-yellow-300 p-2 rounded-full text-lg">⏳</div>
          <div>
            <p className="font-semibold text-gray-900">24-Hour Consultation</p>
            <p className="text-gray-500 text-sm">Serving in various countries</p>
          </div>
        </div>

        {/* Floating User Count */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
            <img
              src="https://source.unsplash.com/100x100/?man,portrait"
              alt="User 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-14 h-14 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
            <img
              src="https://source.unsplash.com/100x100/?man,face"
              alt="User 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
            2k+
          </div>
        </div>

        {/* Floating Success Text */}
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-300 w-72 text-center">
          <p className="text-gray-800 font-semibold">
            ✅ People Successfully Getting Home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

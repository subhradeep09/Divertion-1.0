import React, { useState } from "react";

const Create = () => {
  const [isOnline, setIsOnline] = useState(false);
  return (
    <div className="bg-[#0f0c29] text-white min-h-screen p-8 relative overflow-hidden">
      <div className="h-16"></div>
      {/* Pink glowing background */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0"
        style={{ filter: "blur(120px)" }}
      ></div>
      <div
        className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-pink-400 opacity-25 blur-3xl z-0"
        style={{ filter: "blur(100px)" }}
      ></div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-fuchsia-500 opacity-20 blur-3xl z-0"
        style={{ filter: "blur(90px)" }}
      ></div>

      <div className="relative z-10 space-y-12">
        {/* Basic Info */}
        <fieldset className="border border-pink-600 rounded-lg p-6">
          <legend className="text-pink-400 font-semibold text-lg">📝 Basic Info</legend>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Event Title"
              className="bg-transparent border border-pink-300 text-white p-2 rounded"
            />
            <input
              type="file"
              className="bg-transparent border border-pink-300 text-white p-2 rounded"
            />
            <textarea
              placeholder="Description"
              className="md:col-span-2 bg-transparent border border-pink-300 text-white p-2 rounded h-32"
            />
            <input
              type="text"
              placeholder="Tags (comma separated, e.g., music, outdoor, tech)"
              className="bg-transparent border border-pink-300 text-white p-2 rounded md:col-span-2"
            />
          </div>
        </fieldset>

        {/* Location Details */}
        <fieldset className="border border-pink-600 rounded-lg p-6">
          <legend className="text-pink-400 font-semibold text-lg">📍 Location Details</legend>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="md:col-span-2">
              <div className="flex items-center justify-start mb-4">
                <label htmlFor="eventMode" className="text-pink-200 font-medium mr-4">Event Mode:</label>
                <div className="flex items-center space-x-2">
                  <button
                    className={`px-4 py-1 rounded-full transition ${
                      isOnline ? 'bg-pink-200 text-pink-800' : 'bg-pink-600 text-white'
                    }`}
                    onClick={() => setIsOnline(false)}
                  >
                    Offline
                  </button>
                  <button
                    className={`px-4 py-1 rounded-full transition ${
                      isOnline ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-800'
                    }`}
                    onClick={() => setIsOnline(true)}
                  >
                    Online
                  </button>
                </div>
              </div>
              {isOnline ? (
                <input
                  type="text"
                  placeholder="Platform Name (e.g., Zoom, Google Meet)"
                  className="bg-transparent border border-pink-300 text-white p-2 rounded w-full"
                />
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Venue Name"
                    className="bg-transparent border border-pink-300 text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="bg-transparent border border-pink-300 text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="bg-transparent border border-pink-300 text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="bg-transparent border border-pink-300 text-white p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="bg-transparent border border-pink-300 text-white p-2 rounded md:col-span-2"
                  />
                </div>
              )}
            </div>
          </div>
        </fieldset>

        {/* Date & Time */}
        <fieldset className="border border-pink-600 rounded-lg p-6">
          <legend className="text-pink-400 font-semibold text-lg">⏰ Date &amp; Time</legend>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-pink-300 text-sm mb-1">Start Date</label>
              <input
                type="date"
                className="bg-transparent border border-pink-300 text-white p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-pink-300 text-sm mb-1">Start Time</label>
              <input
                type="time"
                className="bg-transparent border border-pink-300 text-white p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-pink-300 text-sm mb-1">End Date</label>
              <input
                type="date"
                className="bg-transparent border border-pink-300 text-white p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-pink-300 text-sm mb-1">End Time</label>
              <input
                type="time"
                className="bg-transparent border border-pink-300 text-white p-2 rounded"
              />
            </div>
            <div className="md:col-span-2 mt-4 text-right">
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded shadow transition"
                onClick={() => {
                  // This would eventually open a modal or redirect to the calendar view
                  alert('Check calendar for scheduling conflicts.');
                }}
              >
                📅 View Calendar for Conflicts
              </button>
            </div>
          </div>
        </fieldset>

        {/* Tickets & Pricing */}
        <fieldset className="border border-pink-600 rounded-lg p-6">
          <legend className="text-pink-400 font-semibold text-lg">🎟️ Tickets &amp; Pricing</legend>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <input
              type="number"
              min="0"
              placeholder="Total Tickets"
              className="bg-transparent border border-pink-300 text-white p-2 rounded"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Ticket Price (USD)"
              className="bg-transparent border border-pink-300 text-white p-2 rounded"
            />
            <input
              type="number"
              min="0"
              placeholder="Max Tickets per Person"
              className="bg-transparent border border-pink-300 text-white p-2 rounded"
            />
            <select className="bg-transparent border border-pink-300 text-white p-2 rounded">
              <option value="">Ticket Type</option>
              <option value="regular">Regular</option>
              <option value="vip">VIP</option>
              <option value="free">Free</option>
            </select>
          </div>
        </fieldset>

        {/* Settings */}
        <fieldset className="border border-pink-600 rounded-lg p-6">
          <legend className="text-pink-400 font-semibold text-lg">⚙️ Settings</legend>
          <div className="grid md:grid-cols-2 gap-4 mt-4 items-center">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="public"
                className="accent-pink-500 w-5 h-5"
              />
              <label htmlFor="public" className="text-pink-200">
                Public Event
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="age"
                className="accent-pink-500 w-5 h-5"
              />
              <label htmlFor="age" className="text-pink-200">
                18+ Only
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                className="accent-pink-500 w-5 h-5"
              />
              <label htmlFor="featured" className="text-pink-200">
                Feature Event
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="recurring"
                className="accent-pink-500 w-5 h-5"
              />
              <label htmlFor="recurring" className="text-pink-200">
                Recurring Event
              </label>
            </div>
          </div>
        </fieldset>

        {/* Publish Actions */}
        <fieldset className="border border-pink-600 rounded-lg p-6">
          <legend className="text-pink-400 font-semibold text-lg">🚀 Publish Actions</legend>
          <div className="flex gap-6 mt-4">
            <button className="bg-pink-600 hover:bg-pink-700 transition text-white font-bold py-2 px-6 rounded shadow">
              Publish Event
            </button>
            <button className="bg-transparent border border-pink-400 text-pink-300 font-bold py-2 px-6 rounded hover:bg-pink-900 transition">
              Save as Draft
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Create;
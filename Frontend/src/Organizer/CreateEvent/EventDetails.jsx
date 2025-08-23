import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

const EventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event || null;
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-pink-400 text-xl font-medium">Event not found</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-pink-900/5 to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with modern back button */}
        <div className="flex justify-between items-center mb-8 mt-20">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center text-pink-400 hover:text-pink-300 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-pink-900/30 flex items-center justify-center mr-3 group-hover:bg-pink-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-medium">Back to Events</span>
          </button>

        </div>

        {/* Event Banner with modern design */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl border border-gray-800">
          <div className={`w-full h-96 bg-gray-800 ${imageLoaded ? 'hidden' : 'animate-pulse'}`}></div>
          <img 
            src={event.bannerImage} 
            alt={event.title} 
            className={`w-full h-96 object-cover ${imageLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>
          
          {/* Floating info badges */}
          <div className="absolute top-6 right-6 flex flex-col space-y-3">
            <div className="bg-pink-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {event.isOnline ? "🌐 Online Event" : "📍 In-Person Event"}
            </div>
            {event.isPaid && (
              <div className="bg-black/70 backdrop-blur-md text-pink-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                ${event.price} USD
              </div>
            )}
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">{event.title}</h1>
            <div className="flex items-center">
              <div className="flex items-center text-pink-300 mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-pink-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{event.capacity} spots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content area with adjusted height alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content - Adjusted to match sidebar height */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-xl min-h-[250px]">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-pink-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-pink-400">Event Description</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{event.description}</p>
            </div>

            {/* Theme Card (if exists) */}
            {event.theme && (
              <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-xl min-h-[200px]">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-pink-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-pink-400">Event Theme</h2>
                </div>
                <p className="text-gray-300 text-lg">{event.theme}</p>
              </div>
            )}

            {/* Status & Publication Info */}
            {(event.isPublished !== undefined || event.status || event.rejectionReason) && (
              <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-xl min-h-[200px]">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-pink-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-pink-400">Publication & Status</h2>
                </div>
                <div className="space-y-3 text-gray-300 text-lg">
                  {event.status && (
                    <p><span className="font-semibold text-pink-400">Status:</span> {event.status}</p>
                  )}
                  {event.isPublished !== undefined && (
                    <p><span className="font-semibold text-pink-400">Published:</span> {event.isPublished ? "Yes" : "No"}</p>
                  )}
                  {event.status === "REJECTED" && event.rejectionReason && (
                    <p><span className="font-semibold text-pink-400">Rejection Reason:</span> {event.rejectionReason}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar with Event Info - Height adjusted to match content */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-xl h-fit">
            <div className="flex items-center mb-8">
              <div className="w-2 h-8 bg-pink-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-pink-400">Event Details</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-medium text-lg">{format(new Date(event.date), "MMMM dd, yyyy")}</p>
                </div>
              </div>
              
              <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="text-white font-medium text-lg">{event.startTime}</p>
                </div>
              </div>
              
              <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 11111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-medium text-lg">{event.location}</p>
                  {event.venueDetails && (
                    <p className="text-gray-400 text-sm mt-1">{event.venueDetails}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Capacity</p>
                  <p className="text-white font-medium text-lg">{event.capacity} attendees</p>
                </div>
              </div>

              {event.status && (
                <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                  <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className="text-white font-medium text-lg">{event.status}</p>
                  </div>
                </div>
              )}

              {event.isPublished !== undefined && (
                <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                  <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Published</p>
                    <p className="text-white font-medium text-lg">{event.isPublished ? "Yes" : "No"}</p>
                  </div>
                </div>
              )}

              {event.status === "REJECTED" && event.rejectionReason && (
                <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                  <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-1.414 1.414L15 5.414 13.586 7 15 8.414l-1.414 1.414 1.414 1.414 1.414-1.414 1.414 1.414 1.414-1.414-1.414-1.414 1.414-1.414z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Rejection Reason</p>
                    <p className="text-white font-medium text-lg">{event.rejectionReason}</p>
                  </div>
                </div>
              )}

              {event.eventLink && event.eventLink.trim() !== "" && (
                <div className="flex items-start bg-gray-900/50 p-4 rounded-2xl">
                  <div className="bg-pink-900/30 p-3 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 14.828a4 4 0 010-5.656m0 0L9.172 9.172a4 4 0 115.656 5.656l-1.414 1.414" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Event Link</p>
                    <a href={event.eventLink} target="_blank" rel="noopener noreferrer" className="text-pink-400 font-medium text-lg hover:underline break-all">{event.eventLink}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
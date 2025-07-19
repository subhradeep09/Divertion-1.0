import React from 'react';

const features = [
  {
    icon: '🎯',
    title: 'Personalized Event Recommendations',
    desc: 'Smart ML engine suggests events based on your interests and history.'
  },
  {
    icon: '📅',
    title: 'Conflict-Free Scheduling',
    desc: 'Organizers get intelligent date suggestions to avoid clashes with similar events.'
  },
  {
    icon: '🏷️',
    title: 'QR Code Ticketing',
    desc: 'Instant QR code generation and scanning for easy event check-in.'
  },
  {
    icon: '📊',
    title: 'Role-Based Dashboards',
    desc: 'Separate dashboards for Admins, Organizers, and Attendees with tailored insights.'
  },
  {
    icon: '💬',
    title: 'Feedback & Sentiment Analysis',
    desc: 'Users can rate events; reviews are analyzed for positive or negative sentiment.'
  },
  {
    icon: '⚡',
    title: 'Instant Notifications',
    desc: 'Stay updated with real-time alerts for event changes, ticket sales, and important announcements.'
  },
];

const Features = () => (
  <section id='features' className="relative bg-gradient-to-br from-pink-500 via-pink-600 to-fuchsia-700 py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
    {/* Lighting effect */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vw] max-w-6xl max-h-[600px] bg-pink-400/40 blur-3xl rounded-full z-0 shadow-[0_0_120px_60px_rgba(236,72,153,0.25)]" />
    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none z-0" />
    <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto mb-12">
      <span className="uppercase tracking-widest text-pink-200 font-semibold text-sm md:text-base mb-2">Why Choose Divertion?</span>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-lg tracking-tight font-display">
        Powerful Features for Every Event
      </h2>
    </div>
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl px-2 md:px-8">
      {features.map((feature, idx) => (
        <div
          key={feature.title}
          className="flex flex-col items-center text-center group transition-transform duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-white/80 via-pink-200/70 to-fuchsia-200/60 shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <span className="text-5xl md:text-6xl drop-shadow-lg transition-transform duration-300 group-hover:scale-125">
              {feature.icon}
            </span>
          </div>
          <div className="font-extrabold text-white text-xl md:text-2xl mb-2 drop-shadow-lg tracking-tight">
            {feature.title}
          </div>
          <div className="text-white/90 text-base md:text-lg font-medium max-w-xs">
            {feature.desc}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Features; 
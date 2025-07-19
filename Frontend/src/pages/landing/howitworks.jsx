import React, { useState } from 'react';
import { motion } from 'framer-motion';

const stepsUser = [
  {
    title: 'Sign Up',
    desc: 'Create your free account in seconds.',
  },
  {
    title: 'Browse Events',
    desc: 'Explore and discover events you love.',
  },
  {
    title: 'Book & Join',
    desc: 'Book tickets and join events easily.',
  },
];

const stepsOrganizer = [
  {
    title: 'Register as Organizer',
    desc: 'Sign up and set up your organizer profile.',
  },
  {
    title: 'Create Event',
    desc: 'List your event with all the details.',
  },
  {
    title: 'Manage & Track',
    desc: 'Track registrations and manage your event.',
  },
  {
    title: 'Engage Audience',
    desc: 'Connect with attendees and grow your reach.',
  },
];

const stepCardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.12 * i,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const stepIcons = [
  // User, Search, Ticket, Organizer, Event, Track, Audience
  (
    <svg key="user" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ec4899" className="w-12 h-12 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A2.25 2.25 0 016.75 16.5h10.5a2.25 2.25 0 012.25 2.25v1.5" />
    </svg>
  ),
  (
    <svg key="search" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a21caf" className="w-12 h-12 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
    </svg>
  ),
  (
    <svg key="ticket" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-12 h-12 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75h2.25A2.25 2.25 0 0120.25 6v2.25a.75.75 0 01-.75.75 2.25 2.25 0 100 4.5.75.75 0 01.75.75V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25a.75.75 0 01.75-.75 2.25 2.25 0 100-4.5.75.75 0 01-.75-.75V6A2.25 2.25 0 016 3.75h2.25" />
    </svg>
  ),
  (
    <svg key="organizer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ec4899" className="w-12 h-12 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A2.25 2.25 0 016.75 16.5h10.5a2.25 2.25 0 012.25 2.25v1.5" />
    </svg>
  ),
  (
    <svg key="event" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a21caf" className="w-12 h-12 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="9" stroke="#a21caf" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  (
    <svg key="track" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-12 h-12 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  (
    <svg key="audience" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f472b6" className="w-12 h-12 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5.13a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
];

const StepCard = ({ step, idx }) => {
  const [flipped, setFlipped] = React.useState(false);
  // Pick icon based on step index and role
  const icon = stepIcons[idx % stepIcons.length];
  return (
    <div
      className="relative w-64 h-[340px] [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-[#151515] rounded-lg shadow-2xl overflow-visible flex flex-col items-center justify-center [backface-visibility:hidden] border border-pink-400/30">
          {/* Floating circles */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2 z-0">
            <div className="absolute w-24 h-24 bg-pink-300 rounded-full blur-2xl animate-float-slow" />
            <div className="absolute w-36 h-36 bg-pink-500/60 rounded-full blur-3xl left-8 top-8 animate-float-medium" />
            <div className="absolute w-10 h-10 bg-fuchsia-500/80 rounded-full blur-xl left-32 -top-4 animate-float-fast" />
          </div>
          <div className="relative z-10 flex flex-col items-center w-full pt-10">
            <span className="inline-block bg-gradient-to-br from-pink-400 via-fuchsia-400 to-blue-400 text-white text-xs font-bold px-4 py-1 rounded-full mb-4 shadow-md uppercase tracking-widest">Step {idx + 1}</span>
            <div className="text-2xl font-extrabold text-white text-center mb-2 drop-shadow-lg tracking-tight">{step.title}</div>
            <strong className="text-pink-500 text-lg mt-2">Hover Me</strong>
          </div>
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full bg-[#151515] rounded-lg shadow-2xl flex flex-col items-center justify-center [backface-visibility:hidden] rotate-y-180 border border-pink-400/30">
          <div className="flex flex-col items-center gap-4">
            {icon}
            <div className="mt-4 text-pink-300 text-center text-base font-semibold px-4">{step.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [role, setRole] = useState('participant');
  const steps = role === 'participant' ? stepsUser : stepsOrganizer;

  return (
    <section className="relative py-24 px-4 min-h-[400px] flex flex-col items-center justify-center gap-10 overflow-hidden">
      {/* Glowing background lights (same as About) */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{filter:'blur(120px)'}}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{filter:'blur(100px)'}}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{filter:'blur(90px)'}}></div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg tracking-tight z-10">
        <span className="text-pink-400">How</span> It Works
      </h2>
      {/* Role selection buttons */}
      <div className="flex gap-6 z-10">
        <button
          className={`px-8 py-3 rounded-full font-bold text-lg transition border-2 ${role === 'participant' ? 'bg-pink-500 text-white border-pink-500 shadow-xl' : 'bg-white/10 text-pink-400 border-pink-400 hover:bg-pink-500/10 hover:text-pink-500'}`}
          onClick={() => setRole('participant')}
        >
          Participant
        </button>
        <button
          className={`px-8 py-3 rounded-full font-bold text-lg transition border-2 ${role === 'organizer' ? 'bg-pink-500 text-white border-pink-500 shadow-xl' : 'bg-white/10 text-pink-400 border-pink-400 hover:bg-pink-500/10 hover:text-pink-500'}`}
          onClick={() => setRole('organizer')}
        >
          Organizer
        </button>
      </div>
      {/* Steps */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center z-10">
        {steps.map((step, idx) => (
          <StepCard key={step.title} step={step} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

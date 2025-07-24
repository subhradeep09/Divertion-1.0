import React from 'react';
import { FaCookie, FaClock, FaChartLine, FaTools, FaUserShield } from 'react-icons/fa';

const sections = [
  {
    id: 'cookies',
    icon: <FaCookie className="text-pink-500 text-3xl md:text-4xl" />,
    title: 'What Are Cookies?',
    description: `Cookies are small text files stored on your device when you visit websites. They help enhance user experience by remembering preferences and activity.`
  },
  {
    id: 'types',
    icon: <FaClock className="text-pink-400 text-3xl md:text-4xl" />,
    title: 'Types of Cookies We Use',
    description: `We use session cookies that expire after you close your browser and persistent cookies that remain to remember your settings and improve functionality.`
  },
  {
    id: 'analytics',
    icon: <FaChartLine className="text-pink-400 text-3xl md:text-4xl" />,
    title: 'Analytics and Performance',
    description: `Cookies help us understand how users interact with our platform, which pages are most visited, and how performance can be improved.`
  },
  {
    id: 'preferences',
    icon: <FaTools className="text-pink-500 text-3xl md:text-4xl" />,
    title: 'Managing Cookie Preferences',
    description: `You can choose to accept or decline cookies via your browser settings. Disabling cookies may affect site functionality and features.`
  },
  {
    id: 'privacy',
    icon: <FaUserShield className="text-pink-400 text-3xl md:text-4xl" />,
    title: 'Privacy and Data Protection',
    description: `All cookies and data collected are handled with strict privacy and security measures in accordance with our Privacy Policy.`
  },
];

const blackCardBg = "bg-[#18181b] border-pink-500";

function handleSmoothScroll(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

const CookiePolicy = () => (
  <section className="relative min-h-screen py-24 px-4 md:px-8 bg-gradient-to-br from-black via-[#18181b] to-pink-950 overflow-hidden">
    <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-20 blur-3xl z-0" />
    <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-400 opacity-15 blur-3xl z-0" />
    
    <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
      <nav className="hidden md:flex flex-col gap-4 sticky top-32 h-fit min-w-[220px] bg-[#18181b] border border-pink-500 px-6 py-8 rounded-2xl shadow-xl">
        <span className="uppercase text-xs font-bold text-pink-400 mb-2 tracking-widest">Contents</span>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleSmoothScroll(e, section.id)}
            className="text-white/90 hover:text-pink-400 text-base font-semibold transition-colors px-2 py-1 rounded-lg"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="flex-1 flex flex-col gap-8 mt-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg tracking-tight bg-gradient-to-br from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-transparent">
          Cookie <span className="text-pink-400">Policy</span>
        </h1>
        {sections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`relative ${blackCardBg} border p-8 md:p-12 flex flex-col gap-4 group overflow-hidden rounded-3xl shadow-2xl w-full`}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 opacity-20 blur-3xl rounded-full z-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
            <div className="flex items-center gap-4 z-10">
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-900/30 shadow-lg border border-pink-500">
                {section.icon}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-pink-400 drop-shadow-md tracking-tight">
                {idx + 1}. {section.title}
              </h2>
            </div>
            <p className="text-white/90 text-lg leading-relaxed font-medium z-10">
              {section.description}
            </p>
          </section>
        ))}
      </div>
    </div>
  </section>
);

export default CookiePolicy;

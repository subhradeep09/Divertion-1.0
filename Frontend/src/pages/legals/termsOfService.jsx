import React, { useRef, useState } from 'react';
import { FaGavel, FaUserShield, FaHandshake, FaExclamationTriangle, FaRegCheckCircle, FaCalendarCheck } from 'react-icons/fa';

const termsSections = [
  {
    id: 'acceptance-of-terms',
    title: 'Acceptance of Terms',
    icon: <FaGavel className="text-pink-500 text-3xl md:text-4xl" />,
    content: `By using Divertion, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using the platform.`
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities',
    icon: <FaUserShield className="text-pink-400 text-3xl md:text-4xl" />,
    content: `Users are responsible for maintaining the confidentiality of their account and for all activities that occur under it. Misuse or unauthorized access may lead to suspension.`
  },
  {
    id: 'platform-usage',
    title: 'Platform Usage',
    icon: <FaHandshake className="text-pink-400 text-3xl md:text-4xl" />,
    content: `You agree not to misuse the platform for illegal activities, spamming, or violating intellectual property rights. All content should adhere to community guidelines.`
  },
  {
    id: 'limitations-liabilities',
    title: 'Limitations & Liabilities',
    icon: <FaExclamationTriangle className="text-pink-500 text-3xl md:text-4xl" />,
    content: `Divertion is not liable for any indirect or consequential damages. The platform is provided "as is" without warranties of any kind.`
  },
  {
    id: 'termination-of-access',
    title: 'Termination of Access',
    icon: <FaRegCheckCircle className="text-pink-400 text-3xl md:text-4xl" />,
    content: `We reserve the right to suspend or terminate your access if we suspect any violation of our Terms or policies.`
  },
  {
    id: 'updates-to-terms',
    title: 'Updates to Terms',
    icon: <FaCalendarCheck className="text-pink-500 text-3xl md:text-4xl" />,
    content: `These Terms may be updated occasionally. Continued use after changes implies your acceptance of the revised terms.`
  },
];

const blackCardBg = "bg-[#18181b] border-pink-500";

const TermsOfService = () => {
  const [agreed, setAgreed] = useState(false);
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-4 md:px-12 bg-gradient-to-br from-black via-[#18181b] to-pink-950 overflow-hidden">
      {/* Decorative lights */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-20 blur-3xl z-0" style={{filter:'blur(120px)'}}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-pink-400 opacity-15 blur-3xl z-0" style={{filter:'blur(100px)'}}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-pink-700 opacity-10 blur-3xl z-0" style={{filter:'blur(90px)'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <aside className="md:col-span-3 sticky top-24 self-start bg-[#18181b] border border-pink-500 rounded-3xl p-6 shadow-2xl max-h-[calc(100vh-6rem)] overflow-y-auto">
          <h2 className="text-pink-400 text-2xl font-extrabold mb-6 drop-shadow-lg tracking-tight text-center">
            Table of Contents
          </h2>
          <nav>
            <ul className="flex flex-col gap-4">
              {termsSections.map((section, idx) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleScrollTo(section.id)}
                    className="flex items-center gap-3 w-full text-left text-white/90 hover:text-pink-400 transition-colors duration-300 font-semibold text-lg"
                    aria-label={`Scroll to ${section.title}`}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-900/30 shadow-lg border border-pink-500 text-pink-400">
                      {idx + 1}
                    </span>
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="md:col-span-9 flex flex-col gap-12">
          <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg tracking-tight bg-gradient-to-br from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-transparent select-none">
            Terms of <span className="text-pink-400">Service</span>
          </h1>

          {termsSections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className={`relative ${blackCardBg} border p-8 md:p-12 rounded-3xl shadow-2xl`}
            >
              {/* Background orb */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 opacity-20 blur-3xl rounded-full z-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <div className="flex items-center gap-5 mb-6 z-10 relative">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-900/30 shadow-lg border border-pink-500 text-pink-400 text-4xl">
                  {section.icon}
                </span>
                <h2 className="text-3xl font-extrabold text-pink-400 drop-shadow-md tracking-tight select-none">
                  {idx + 1}. {section.title}
                </h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed font-medium z-10">
                {section.content}
              </p>
            </section>
          ))}
        </main>
      </div>
    </section>
  );
};

export default TermsOfService;

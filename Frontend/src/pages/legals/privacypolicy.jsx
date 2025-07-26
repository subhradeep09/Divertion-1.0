import React from 'react';
import { FaUserShield, FaDatabase, FaShareAlt, FaCookieBite, FaUserEdit, FaLock, FaSyncAlt, FaEnvelope } from 'react-icons/fa';

const sections = [
  {
    title: 'Introduction',
    icon: <FaUserShield className="text-pink-500 text-3xl md:text-4xl" />, 
    content: `Welcome to Divertion! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.`
  },
  {
    title: 'Information We Collect',
    icon: <FaDatabase className="text-pink-400 text-3xl md:text-4xl" />, 
    content: `We collect information you provide directly (such as when you register, book events, or contact us), as well as data collected automatically (like device info, usage data, and cookies).`
  },
  {
    title: 'How We Use Your Information',
    icon: <FaUserEdit className="text-pink-400 text-3xl md:text-4xl" />, 
    content: `We use your information to provide and improve our services, personalize your experience, process transactions, send notifications, and ensure security.`
  },
  {
    title: 'Data Sharing & Disclosure',
    icon: <FaShareAlt className="text-pink-500 text-3xl md:text-4xl" />, 
    content: `We do not sell your personal data. We may share information with trusted partners for service delivery, legal compliance, or with your consent.`
  },
  {
    title: 'Cookies & Tracking',
    icon: <FaCookieBite className="text-pink-400 text-3xl md:text-4xl" />, 
    content: `We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can manage cookie preferences in your browser settings.`
  },
  {
    title: 'Your Rights & Choices',
    icon: <FaUserEdit className="text-pink-400 text-3xl md:text-4xl" />, 
    content: `You have the right to access, update, or delete your data, and to opt out of certain uses. Contact us to exercise your rights.`
  },
  {
    title: 'Data Security',
    icon: <FaLock className="text-pink-500 text-3xl md:text-4xl" />, 
    content: `We implement industry-standard security measures to protect your data. However, no system is completely secure—please use strong passwords and stay vigilant.`
  },
  {
    title: 'Changes to This Policy',
    icon: <FaSyncAlt className="text-pink-400 text-3xl md:text-4xl" />, 
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes and update the effective date.`
  },
  {
    title: 'Contact Us',
    icon: <FaEnvelope className="text-pink-500 text-3xl md:text-4xl" />, 
    content: `If you have questions or concerns about this Privacy Policy, please contact us at privacy@divertion.com.`
  },
];

const blackCardBg = "bg-[#18181b] border-pink-500"; // black card with pink border
const blackSidebarBg = "bg-[#18181b] border-pink-500"; // black sidebar with pink border

function handleSmoothScroll(e, idx) {
  e.preventDefault();
  const el = document.getElementById(`section-${idx}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

const PrivacyPolicy = () => (
  <section className="relative min-h-screen py-24 px-2 md:px-8 bg-gradient-to-br from-black via-[#18181b] to-pink-950 overflow-hidden">
    {/* Glowing pink background lights */}
    <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-20 blur-3xl z-0" style={{filter:'blur(120px)'}}></div>
    <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-pink-400 opacity-15 blur-3xl z-0" style={{filter:'blur(100px)'}}></div>
    <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-pink-700 opacity-10 blur-3xl z-0" style={{filter:'blur(90px)'}}></div>
    <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
      {/* Table of Contents */}
      <nav
        className={`hidden md:flex flex-col gap-4 sticky top-32 h-fit min-w-[220px] ${blackSidebarBg} border px-6 py-8 rounded-2xl shadow-xl`}
      >
        <span className="uppercase text-xs font-bold text-pink-400 mb-2 tracking-widest">On this page</span>
        {sections.map((section, idx) => (
          <a
            key={section.title}
            href={`#section-${idx}`}
            className="text-white/90 hover:text-pink-400 text-base font-semibold transition-colors px-2 py-1 rounded-lg"
            onClick={e => handleSmoothScroll(e, idx)}
          >
            {section.title}
          </a>
        ))}
      </nav>
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-7 mt-6">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg tracking-tight bg-gradient-to-br from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-transparent"
        >
          Privacy <span className="text-pink-400">Policy</span>
        </h1>
        {sections.map((section, idx) => (
          <section
            key={section.title}
            id={`section-${idx}`}
            className={`relative mb-2 ${blackCardBg} border p-8 md:p-12 flex flex-col gap-4 group overflow-hidden rounded-3xl shadow-2xl w-full`}
          >
            {/* Floating pink orb */}
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
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  </section>
);

export default PrivacyPolicy;
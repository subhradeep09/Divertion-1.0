import React from 'react';
import { motion } from 'framer-motion';
// import heroVideo from '../../assets/Hero.mp4';

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3 + 0.1 * i,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
  hover: { scale: 1.06, boxShadow: '0 6px 24px 0 rgba(236,72,153,0.18)' },
};

const Hero = () => (
  <section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-black">
    {/* Event-related Video Background */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    >
      <source src="https://videos.pexels.com/video-files/2361938/2361938-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    {/* Solid Theme Overlay */}
    <div className="absolute inset-0 bg-[#18181b]/80 z-10" />
    {/* Content - bottom left */}
    <div className="absolute bottom-0 left-0 z-20 flex flex-col items-start justify-end text-left px-8 md:px-20 pb-12 md:pb-20 w-full max-w-4xl">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-[0_6px_24px_rgba(236,72,153,0.7)]"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={textVariants}
      >
        <span className="block"><span className="text-pink-400">Unforgettable</span> <span className="text-white">Events,</span></span>
        <span className="block text-white">Endless Possibilities</span>
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl font-medium mb-10 max-w-xl text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] tracking-wide leading-relaxed"
        initial="hidden"
        animate="visible"
        custom={2}
        variants={textVariants}
      >
        Discover, join, and create with <span className="text-pink-400 font-semibold">Divertion</span> — your modern event universe.
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-5">
        <motion.button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-xl text-base md:text-lg transition tracking-wide focus:outline-none focus:ring-4 focus:ring-pink-400/30 flex items-center gap-2"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          custom={3}
          variants={buttonVariants}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-7 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>Explore Events</span>
        </motion.button>
        <motion.button
          className="bg-white/10 border-2 border-pink-400 text-white font-bold px-8 py-3 rounded-full shadow-md text-base md:text-lg hover:bg-pink-500/10 hover:text-pink-400 hover:border-pink-400 transition tracking-wide focus:outline-none focus:ring-4 focus:ring-pink-400/30 flex items-center gap-2"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          custom={4}
          variants={buttonVariants}
        >
          <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span>Host Your Event</span>
        </motion.button>
      </div>
    </div>
  </section>
);

export default Hero; 
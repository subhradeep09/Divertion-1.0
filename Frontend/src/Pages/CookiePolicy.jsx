import React,{useEffect} from "react";
import { motion } from "framer-motion";
import {
  Cookie,
  Eye,
  SlidersHorizontal,
  Lock,
  Ban,
  Contact2,
} from "lucide-react";

const cookieSections = [
  {
    icon: <Cookie className="text-indigo-500 w-8 h-8" />,
    title: "What Are Cookies?",
    content: (
      <p>
        Cookies are small data files stored on your device that help us enhance your browsing experience. They allow us to remember your preferences, understand site usage, and personalize content.
      </p>
    ),
  },
  {
    icon: <Eye className="text-indigo-500 w-8 h-8" />,
    title: "How We Use Cookies",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>To keep you logged in</li>
        <li>To remember your settings and preferences</li>
        <li>To analyze site performance and usage</li>
        <li>To deliver relevant event suggestions and content</li>
      </ul>
    ),
  },
  {
    icon: <SlidersHorizontal className="text-indigo-500 w-8 h-8" />,
    title: "Types of Cookies We Use",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Essential:</strong> Necessary for core functionality</li>
        <li><strong>Functional:</strong> Help personalize your experience</li>
        <li><strong>Analytics:</strong> Track site usage to improve performance</li>
      </ul>
    ),
  },
  {
    icon: <Ban className="text-indigo-500 w-8 h-8" />,
    title: "Managing Cookies",
    content: (
      <p>
        You can manage or disable cookies through your browser settings. However, turning off cookies may impact your ability to use certain features of our platform.
      </p>
    ),
  },
  {
    icon: <Lock className="text-indigo-500 w-8 h-8" />,
    title: "Data & Privacy",
    content: (
      <p>
        We do not use cookies to collect sensitive personal data. All cookie-based analytics are anonymized and used strictly to enhance your experience.
      </p>
    ),
  },
  {
    icon: <Contact2 className="text-indigo-500 w-8 h-8" />,
    title: "Contact Us",
    content: (
      <p>
        If you have any questions about our Cookie Policy, feel free to reach out at <span className="font-medium">support@youreventsite.com</span>.
      </p>
    ),
  },
];

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/2795171/2795171-uhd_2560_1440_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white text-4xl md:text-6xl font-extrabold text-center px-4"
        >
          Cookies? Yep <br /> But We Don’t Spy, We Simplify
        </motion.h1>
      </div>
    </div>
  );
};

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <HeroSection />
      <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-7xl mx-auto space-y-20"
        >
          <h1 className="text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400">
            Cookie Policy
          </h1>

          {cookieSections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.1 }}
              // viewport={{ once: true, amount: 0.3 }}
              className="w-full bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 backdrop-blur-xl rounded-3xl shadow-lg px-6 py-10 md:px-10 md:py-16 flex flex-col md:flex-row items-center justify-center gap-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="shrink-0">{section.icon}</div>
              <div className="flex-1 max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                  {section.title}
                </h2>
                <div className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {section.content}
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default CookiePolicy;
import React,{useEffect} from "react";
import { motion } from "framer-motion";
import {
  Info,
  Users,
  Mail,
  Cookie,
  Lock,
} from "lucide-react";

const sections = [
  {
    icon: <Info className="w-10 h-10 text-indigo-500" />,
    title: "Introduction",
    content: (
      <p>
        We value your privacy and are committed to protecting your personal
        information. This privacy policy explains how we collect, use, and
        safeguard your data when you use our event management platform.
      </p>
    ),
  },
  {
    icon: <Users className="w-10 h-10 text-indigo-500" />,
    title: "Information We Collect",
    content: (
      <ul className="list-disc ml-5 space-y-1">
        <li>Name, email address, phone number</li>
        <li>Login credentials</li>
        <li>Event details (created/registered)</li>
        <li>IP address and browser info (optional analytics)</li>
        <li>Uploaded media/files (if any)</li>
      </ul>
    ),
  },
  {
    icon: <Info className="w-10 h-10 text-indigo-500" />,
    title: "How We Use Your Information",
    content: (
      <ul className="list-disc ml-5 space-y-1">
        <li>To manage user accounts</li>
        <li>To register for or create events</li>
        <li>To send important notifications/emails</li>
        <li>To improve user experience</li>
        <li>To detect and prevent fraud or misuse</li>
      </ul>
    ),
  },
  {
    icon: <Mail className="w-10 h-10 text-indigo-500" />,
    title: "Sharing Your Information",
    content: (
      <ul className="list-disc ml-5 space-y-1">
        <li>We do not sell or rent personal data.</li>
        <li>We may share data with trusted third-party tools (e.g., email services, analytics).</li>
        <li>We may disclose information if required by law.</li>
      </ul>
    ),
  },
  {
    icon: <Cookie className="w-10 h-10 text-indigo-500" />,
    title: "Cookies & Tracking",
    content: (
      <p>
        We use cookies to enhance user experience, manage sessions, and gather analytics.
        Users can manage cookie preferences in their browser settings.
      </p>
    ),
  },
  {
    icon: <Lock className="w-10 h-10 text-indigo-500" />,
    title: "Data Security",
    content: (
      <p>
        We implement appropriate security measures such as password hashing and encryption
        to protect your data. Our team is committed to keeping your information safe.
      </p>
    ),
  },
  {
    icon: <Users className="w-10 h-10 text-indigo-500" />,
    title: "User Rights",
    content: (
      <ul className="list-disc ml-5 space-y-1">
        <li>Access, update, or delete their data</li>
        <li>Withdraw consent where applicable</li>
        <li>Contact us for any privacy concerns</li>
      </ul>
    ),
  },
  {
    icon: <Info className="w-10 h-10 text-indigo-500" />,
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this privacy policy from time to time. Any changes will be
        posted on this page with an updated effective date.
      </p>
    ),
  },
  {
    icon: <Mail className="w-10 h-10 text-indigo-500" />,
    title: "Contact Information",
    content: (
      <p>
        If you have any questions about this Privacy Policy, please contact us at
        <span className="font-medium text-indigo-700 dark:text-indigo-400"> support@youreventsite.com</span>.
      </p>
    ),
  },
];

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/5377994/5377994-uhd_2560_1440_25fps.mp4"
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
          Your Privacy, Our Priority
        </motion.h1>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <>
      <HeroSection />
      <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="max-w-7xl mx-auto space-y-24"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400"
          >
            Privacy Policy
          </motion.h1>

          {sections.map((section, idx) => (
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

export default PrivacyPolicy;
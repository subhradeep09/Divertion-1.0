import React,{useEffect} from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  CircleSlash,
  MailCheck,
} from "lucide-react";

const tosSections = [
  {
    icon: <Gavel className="text-indigo-500 w-8 h-8" />,
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing and using our platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
      </p>
    ),
  },
  {
    icon: <ClipboardList className="text-indigo-500 w-8 h-8" />,
    title: "User Responsibilities",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Provide accurate and up-to-date information</li>
        <li>Keep your login credentials confidential</li>
        <li>Use the platform for lawful purposes only</li>
      </ul>
    ),
  },
  {
    icon: <ShieldCheck className="text-indigo-500 w-8 h-8" />,
    title: "Account Security",
    content: (
      <p>
        You are responsible for maintaining the confidentiality of your account. Notify us immediately of any unauthorized use.
      </p>
    ),
  },
  {
    icon: <CheckCircle2 className="text-indigo-500 w-8 h-8" />,
    title: "Event Creation Guidelines",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Do not create misleading or inappropriate events</li>
        <li>Respect intellectual property rights</li>
        <li>Ensure accurate event information</li>
      </ul>
    ),
  },
  {
    icon: <AlertCircle className="text-indigo-500 w-8 h-8" />,
    title: "Termination",
    content: (
      <p>
        We reserve the right to suspend or terminate accounts that violate our terms, engage in abusive behavior, or compromise system integrity.
      </p>
    ),
  },
  {
    icon: <CircleSlash className="text-indigo-500 w-8 h-8" />,
    title: "Prohibited Activities",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Spamming, phishing, or spreading malware</li>
        <li>Using bots or automated scripts</li>
        <li>Violating any applicable laws</li>
      </ul>
    ),
  },
  {
    icon: <MailCheck className="text-indigo-500 w-8 h-8" />,
    title: "Contact",
    content: (
      <p>
        If you have any questions about these terms, feel free to contact us at <span className="font-medium">support@youreventsite.com</span>.
      </p>
    ),
  },
];

const HeroSection = () => {
    return (
      <div className="relative h-[70vh] w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/7646698/7646698-uhd_2560_1440_25fps.mp4"
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
            The Rules of the Game <br /> Read Before You Play
          </motion.h1>
        </div>
      </div>
    );
  };

const TermsOfService = () => {
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
            Terms of Service
          </h1>

          {tosSections.map((section, idx) => (
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

export default TermsOfService;
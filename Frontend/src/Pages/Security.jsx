import React,{useEffect} from "react";
import { motion } from "framer-motion";
import {
  Shield,
  LockKeyhole,
  BugOff,
  ServerCog,
  AlertTriangle,
  MailQuestion,
} from "lucide-react";

const securitySections = [
  {
    icon: <Shield className="text-indigo-500 w-8 h-8" />,
    title: "Our Commitment to Security",
    content: (
      <p>
        We take the protection of your data seriously and implement industry-standard security measures to protect your personal information and prevent unauthorized access.
      </p>
    ),
  },
  {
    icon: <LockKeyhole className="text-indigo-500 w-8 h-8" />,
    title: "Data Encryption",
    content: (
      <p>
        All sensitive data transmitted between you and our servers is encrypted using SSL/TLS protocols, ensuring secure communication over the internet.
      </p>
    ),
  },
  {
    icon: <BugOff className="text-indigo-500 w-8 h-8" />,
    title: "Vulnerability Management",
    content: (
      <p>
        We regularly scan and update our platform to patch known vulnerabilities. Security audits and code reviews help us stay ahead of potential threats.
      </p>
    ),
  },
  {
    icon: <ServerCog className="text-indigo-500 w-8 h-8" />,
    title: "Infrastructure Security",
    content: (
      <p>
        Our systems are hosted on secure, scalable, and managed cloud infrastructure with network firewalls, access controls, and continuous monitoring.
      </p>
    ),
  },
  {
    icon: <AlertTriangle className="text-indigo-500 w-8 h-8" />,
    title: "Incident Response",
    content: (
      <p>
        In the unlikely event of a security breach, we follow a structured response plan to contain, investigate, and notify affected users promptly.
      </p>
    ),
  },
  {
    icon: <MailQuestion className="text-indigo-500 w-8 h-8" />,
    title: "Questions & Reports",
    content: (
      <p>
        Found a vulnerability or have security concerns? Please contact our security team at <span className="font-medium">security@youreventsite.com</span>.
      </p>
    ),
  },
];

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/3808513/3808513-hd_1920_1080_25fps.mp4"
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
        Your Data Deserves a Bodyguard <br />We’ve Got It Covered
        </motion.h1>
      </div>
    </div>
  );
};

const SecurityPolicy = () => {
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
            Security Policy
          </h1>

          {securitySections.map((section, idx) => (
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

export default SecurityPolicy;
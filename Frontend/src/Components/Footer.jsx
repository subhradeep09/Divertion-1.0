import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaChevronUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-16 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-12 md:gap-16 pb-12 border-b border-gray-300 dark:border-gray-700">
          {/* Brand Section */}
          <div>
            <h3 className="text-4xl font-extrabold mb-6 text-blue-600 dark:text-blue-400">
              EventHub
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Revolutionizing event experiences through innovative technology.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6 flex-wrap">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 text-2xl transition hover:text-white hover:bg-blue-500"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Explore</h4>
            <ul className="space-y-4">
              {["Home", "Events", "Organizers", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-800 dark:text-white hover:text-blue-500 text-lg transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Connect</h4>
            <div className="space-y-4 text-lg">
              <p className="text-gray-800 dark:text-white">📍 Kolkata, 700001</p>
              <p className="text-gray-800 dark:text-white">📞 +91 70444 66468</p>
              <p className="text-gray-800 dark:text-white">📧 support@eventhub.com</p>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              {[
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms-of-service" },
                { name: "Cookie Policy", path: "/cookie-policy" },
                { name: "Security", path: "/security" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-800 dark:text-white hover:text-blue-500 text-lg transition duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-lg mt-10 gap-6">
          <p className="text-gray-800 dark:text-white text-center md:text-left">
            © 2025 EventHub. All rights reserved.
          </p>
          <motion.button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  whileHover={{ y: -5, scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-300 shadow-md"
>
  <FaChevronUp className="text-xl sm:text-2xl" />
</motion.button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

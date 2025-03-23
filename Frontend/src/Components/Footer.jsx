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

const Footer = () => {

  return (
    <footer
      className={`w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-16 relative bottom-0 shadow-2xl z-50`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Grid Layout */}
        <div
          className={`grid md:grid-cols-4 grid-cols-1 gap-16 pb-12 border-b border-gray-300 dark:border-gray-700`}
        >
          {/* Brand Section */}
          <div>
            <h3 className="text-4xl font-extrabold mb-6 text-blue-600 dark:text-blue-400">
              EventHub
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Revolutionizing event experiences through innovative technology.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-6 mt-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 text-2xl transition duration-300 hover:text-white hover:bg-blue-500"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Navigation Links */}
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
        <div className="flex justify-between items-center text-lg mt-8">
          <p className="text-gray-800 dark:text-white">
            © 2024 EventHub. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {/* Scroll to Top Button */}
            <a
              href="#"
              className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full shadow-xl transition duration-300 hover:bg-blue-600"
            >
              <FaChevronUp className="text-white text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

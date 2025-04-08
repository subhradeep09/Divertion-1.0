import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGoogle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation Variants
const leftFadeIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const rightFadeIn = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const ContactUs = () => {
  return (
    <section className="min-h-screen w-full grid md:grid-cols-2 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">

      {/* Left Section */}
      <motion.div
        className="relative flex flex-col justify-center px-10 py-16 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3943951/pexels-photo-3943951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
        initial="hidden"
        whileInView="visible"
        variants={leftFadeIn}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md p-8 rounded-xl max-w-md shadow-lg transition-all duration-500">
          <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">Let’s Connect</h2>
          <p className="text-gray-800 dark:text-gray-300 mb-6">
            We'd love to hear from you! Whether you have a question, want to collaborate,
            or just want to say hi — feel free to drop a message.
          </p>

          {/* Contact Details */}
          <div className="space-y-4 mb-8 text-sm text-gray-800 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-black dark:text-white">Address</h4>
              <p>123, Your Street Name,<br />Your City, Your Country - 000000</p>
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white">Phone</h4>
              <p>+91 12345 67890</p>
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white">Email</h4>
              <p>contact@eventhub.com</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 text-xl text-black dark:text-white">
            <a href="#" className="hover:text-[#1DA1F2] transition"><FaTwitter /></a>
            <a href="#" className="hover:text-[#1877F2] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#DB4437] transition"><FaGoogle /></a>
            <a href="#" className="hover:text-[#E1306C] transition"><FaInstagram /></a>
          </div>
        </div>
      </motion.div>

      {/* Right Section Form */}
      <motion.div
        className="flex items-center justify-center bg-[#f5f5f5] dark:bg-[#1d1f20] p-10 transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        variants={rightFadeIn}
        transition={{ duration: 0.7 }}
      >
        <form className="w-full max-w-md space-y-6">
          <div>
            <h3 className="text-3xl font-semibold mb-1 text-black dark:text-white">Send Us a Message</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">We will get back to you in 24 hours</p>
          </div>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-white dark:bg-[#2c2f30] text-black dark:text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-white dark:bg-[#2c2f30] text-black dark:text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full bg-white dark:bg-[#2c2f30] text-black dark:text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full bg-white dark:bg-[#2c2f30] text-black dark:text-white px-4 py-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md font-semibold text-white"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactUs;
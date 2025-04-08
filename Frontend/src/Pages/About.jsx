import React, { useContext } from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';

const AboutUs = () => {
  const { isDarkMode: isDark } = useContext(ThemeContext);

  const cardClasses = "rounded-xl p-6 sm:p-8 shadow-md transition-colors duration-300";
  const featureCardClasses = "p-4 rounded-lg shadow-sm transition-colors duration-300";

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 ${
      isDark ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We're a trio of tech-savvy creators—Soumik Bag, Kousik Mondal, and Subhrodeep Bhattacharya—passionate about building smart solutions.
          </p>
        </div>

        {/* Our Mission */}
        <div className={`${cardClasses} ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">🎯 Our Mission</h2>
          <p className="text-center">
            To simplify event planning and enhance user experience through intuitive, scalable platforms.
          </p>
        </div>

        {/* What We Offer */}
        <div className={`${cardClasses} ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">🌟 What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              '📅 Event creation',
              '👥 Registration',
              '🔐 Access control',
              '📲 Real-time updates',
              '🖥️ Responsive design',
              '📊 Smart scheduling'
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${featureCardClasses} ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Why We Built This */}
        <div className={`${cardClasses} ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">💡 Why We Built This</h2>
          <p className="text-center">
            As students who've experienced event planning chaos, we built this to simplify the process for everyone.
          </p>
        </div>

        {/* Meet the Team */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">👨‍💻 Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Soumik Bag",
                title: "MERN Stack Developer",
                bio: "Creates intuitive user experiences and explores new technologies.",
                image: "https://via.placeholder.com/150",
                social: {
                  linkedin: "#",
                  github: "#",
                  facebook: "#",
                  instagram: "#",
                },
              },
              {
                name: "Kousik Mondal",
                title: "Backend Developer",
                bio: "Builds robust systems and ensures data integrity.",
                image: "https://via.placeholder.com/150",
                social: {
                  linkedin: "#",
                  github: "#",
                  facebook: "#",
                  instagram: "#",
                },
              },
              {
                name: "Subhrodeep Bhattacharya",
                title: "Frontend Developer",
                bio: "Focuses on seamless interfaces and problem-solving.",
                image: "https://via.placeholder.com/150",
                social: {
                  linkedin: "#",
                  github: "#",
                  facebook: "#",
                  instagram: "#",
                },
              }
            ].map((member, index) => (
              <div
                key={index}
                className={`${cardClasses} ${isDark ? 'bg-gray-800' : 'bg-white'} hover:scale-[1.02] transition-transform duration-300`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-600"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{member.title}</p>
                <p className="mt-2 text-sm">{member.bio}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href={member.social.linkedin} className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={member.social.github} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                    <FaGithub size={20} />
                  </a>
                  <a href={member.social.facebook} className="text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400">
                    <FaFacebook size={20} />
                  </a>
                  <a href={member.social.instagram} className="text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400">
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Vision */}
        <div className={`${cardClasses} ${isDark ? 'bg-gray-800' : 'bg-white'} text-center`}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">🚀 Our Vision</h2>
          <p>
            We envision platforms where every event is organized with ease, powered by technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
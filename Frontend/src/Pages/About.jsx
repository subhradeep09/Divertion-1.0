import React, { useContext, useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const githubUsers = ['Soumik-Coder18', 'vKousik', 'subhradeep09'];

const socialLinks = {
  'Soumik-Coder18': {
    linkedin: 'https://www.linkedin.com/in/soumik-bag-0b9900253/',
    facebook: 'https://www.facebook.com/profile.php?id=100083845817568',
    instagram: 'https://www.instagram.com/soumik_bag_18/',
  },
  'vKousik': {
    linkedin: 'https://www.linkedin.com/in/kousik-mondal-b46688356/',
    facebook: 'https://www.facebook.com/profile.php?id=100058530370597',
    instagram: 'https://www.instagram.com/v_kousik.18/',
  },
  'subhradeep09': {
    linkedin: 'https://www.linkedin.com/in/subhradeep-bhattacharya/',
    facebook: 'https://www.facebook.com/profile.php?id=100086398238060',
    instagram: 'https://www.instagram.com/subhradeep_bhattacharya/',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      const data = await Promise.all(
        githubUsers.map(async (username) => {
          const res = await fetch(`https://api.github.com/users/${username}`);
          const userData = await res.json();
          return {
            ...userData,
            socials: socialLinks[username],
          };
        })
      );
      setTeam(data);
    };

    fetchTeam();
  }, []);

  const cardClasses = "rounded-xl p-6 sm:p-8 shadow-lg transition-transform duration-300 transform hover:scale-105";
  const featureCardClasses = "p-4 rounded-lg shadow-md transition-colors duration-300";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          src="https://videos.pexels.com/video-files/2890236/2890236-hd_1920_1080_30fps.mp4"
        />
        <motion.div
          className="relative z-10 text-center px-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white text-4xl sm:text-6xl font-bold drop-shadow-md">Welcome to Our World</h1>
          <p className="text-gray-200 text-lg sm:text-xl mt-4 max-w-2xl mx-auto">
            Empowering event planning with smart, scalable solutions.
          </p>
        </motion.div>
      </div>

      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <motion.div className="text-center" initial="hidden" whileInView="visible" variants={fadeUp}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h2>
          <p className="text-lg max-w-2xl mx-auto">
            We're a trio of tech-savvy creators—Soumik Bag, Kousik Mondal, and Subhrodeep Bhattacharya—passionate about building smart solutions.
          </p>
        </motion.div>

        {[{
          title: "🎯 Our Mission",
          content: "To simplify event planning and enhance user experience through intuitive, scalable platforms."
        }, {
          title: "💡 Why We Built This",
          content: "As students who've experienced event planning chaos, we built this to simplify the process for everyone."
        }].map((block, idx) => (
          <motion.div
            key={idx}
            className={`${cardClasses} bg-white dark:bg-gray-800 text-center`}
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 + idx * 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{block.title}</h2>
            <p className="mb-4">{block.content}</p>
          </motion.div>
        ))}

        <motion.div
          className={`${cardClasses} bg-white dark:bg-gray-800`}
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">🌟 What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[ '📅 Event creation', '👥 Registration', '🔐 Access control', '📲 Real-time updates', '🖥️ Responsive design', '📊 Smart scheduling' ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`${featureCardClasses} bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600`}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 1 }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">👨‍💻 Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className={`${cardClasses} bg-white dark:bg-gray-800 text-center`}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-600 shadow-md"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name || member.login}</h3>
                <p className="text-sm italic text-gray-600 dark:text-gray-300">{member.bio || 'Tech Enthusiast'}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href={member.html_url} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    <FaGithub size={24} />
                  </a>
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <FaLinkedin size={24} />
                    </a>
                  )}
                  {member.socials?.facebook && (
                    <a href={member.socials.facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200">
                      <FaFacebook size={24} />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-800 dark:text-pink-300 dark:hover:text-pink-200">
                      <FaInstagram size={24} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`${cardClasses} bg-white dark:bg-gray-800`}
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">💎 Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[{
              icon: '🚀',
              title: 'Fast & Scalable',
              desc: 'We build systems optimized for speed and growth, perfect for both small and large-scale events.'
            }, {
              icon: '🔒',
              title: 'Secure & Reliable',
              desc: 'Data privacy and reliability are top priorities. Your event info is safe with us.'
            }, {
              icon: '🎨',
              title: 'User -Friendly Design',
              desc: 'Intuitive interfaces and responsive design for a smooth experience on any device.'
            }].map((feature, idx) => (
              <motion.div
                key={idx}
                className={`${featureCardClasses} bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {[{
          title: "🚀 Our Vision",
          content: "We envision platforms where every event is organized with ease, powered by technology."
        }, {
          title: "🤝 Join Us",
          content: "Are you passionate about technology and innovation? We’re always excited to collaborate, learn, and grow with like-minded individuals. Let’s create something amazing together!",
          button: true
        }].map((block, idx) => (
          <motion.div
            key={idx}
            className={`${cardClasses} bg-white dark:bg-gray-800 text-center`}
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            transition={{ duration: 1.1 + idx * 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{block.title}</h2>
            <p className="mb-4">{block.content}</p>
            {block.button && (
              <button
                onClick={() => navigate('/contact')}
                className="inline-block px-6 py-3 rounded-full font-semibold transition-colors duration-300 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Contact Us
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;

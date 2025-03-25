import React, { useState, useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const LoginPage = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Use ThemeContext
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className={`flex justify-center items-center min-h-screen p-6 `}>
      <div className={`flex w-full max-w-4xl p-8 rounded-xl shadow-lg border ${isDarkMode ? 'bg-[#111827] border-gray-700' : 'bg-white border-gray-300'} space-x-8`}>
        {/* Left Side: Video & Welcome Text */}
        <div className={`w-1/2 flex flex-col items-center text-center ${isDarkMode ? 'text-white' : 'text-black'} p-6`}>
          <h2 className="text-3xl font-bold mb-4">WELCOME BACK TO EVENTHUB</h2>
          <p className={`text-gray-400 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Discover amazing events and experiences near you.</p>
          <video
            src="https://cdn.pixabay.com/video/2022/09/13/131154-750216587_large.mp4"
            autoPlay
            loop
            muted
            className="rounded-lg shadow-lg w-full h-auto border border-gray-700"
          ></video>
          <h3 className="text-xl font-semibold mt-6">Connect with Us</h3>
          <div className="social-container flex justify-center space-x-4 mt-3">
            <a href="#" className="social-icon text-blue-600 text-2xl hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="social-icon text-blue-400 text-2xl hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="social-icon text-pink-500 text-2xl hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="social-icon text-blue-700 text-2xl hover:text-blue-600"><FaLinkedin /></a>
            <a href="#" className="social-icon text-red-500 text-2xl hover:text-red-400"><FaYoutube /></a>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className={`w-1/2 p-6 relative flex flex-col justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <button onClick={() => navigate("/auth")} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-all duration-300">
            <FaTimes size={20} />
          </button>
          <h2 className="text-center text-2xl font-semibold mb-6">Log In</h2>

          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 pl-10 pr-10 rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <p className="text-blue-400 text-right text-sm cursor-pointer mb-4">Forgot Password?</p>

          <button className="w-full bg-transparent border border-blue-500 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-200'}">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
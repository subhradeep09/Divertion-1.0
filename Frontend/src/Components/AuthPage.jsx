import React, { useState,useEffect } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AuthPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 transition-all duration-300 bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        {/* Left: Welcome Section */}
        <div
          className="relative p-8 flex flex-col items-center justify-center text-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1050&q=80)",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-xl">
              Welcome to EventHub
            </h2>
            <p className="text-gray-200 text-lg mb-6 max-w-md mx-auto">
              Find, join, and enjoy events like never before. Your ultimate
              event companion awaits.
            </p>
            <h3 className="text-white font-semibold mb-2">Connect With Us</h3>
            <div className="flex justify-center space-x-4 text-xl text-white">
              <FaFacebook className="hover:text-blue-500 transition" />
              <FaTwitter className="hover:text-blue-400 transition" />
              <FaInstagram className="hover:text-pink-500 transition" />
              <FaLinkedin className="hover:text-blue-600 transition" />
              <FaYoutube className="hover:text-red-500 transition" />
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="p-10 md:p-14 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-center">Login to EventHub</h2>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent dark:border-gray-600"
            />
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent dark:border-gray-600"
            />
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              />
            )}
          </div>

          {/* Forgot password */}
          <p className="text-right text-sm text-blue-500 cursor-pointer hover:underline">
            Forgot Password?
          </p>

          {/* Login button */}
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300">
            Log In
          </button>

          {/* Create account */}
          <p className="text-center text-sm">
            New Here?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </p>

          {/* OR separator */}
          <div className="flex items-center gap-4">
            <div className="flex-grow border-t border-gray-400 dark:border-gray-600" />
            <span className="text-gray-400 text-sm dark:text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-400 dark:border-gray-600" />
          </div>

          {/* Google Sign Up */}
          <button className="w-full py-3 border border-gray-400 dark:border-gray-600 flex items-center justify-center gap-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300">
            <FaGoogle /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
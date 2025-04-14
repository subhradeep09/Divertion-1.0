import React, { useState, useEffect, useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaGoogle, FaTimes } from "react-icons/fa";
import { ThemeContext } from '../Context/ThemeContext';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [userType, setUserType] = useState("Participant");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Send verification code
  const sendVerificationCode = () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setGeneratedCode(randomCode);
    setIsCodeSent(true);
    setTimer(60);
    setIsVerified(false);
    alert(`Verification code sent to ${email}: ${randomCode}`);
  };

  // Verify code
  const verifyCode = () => {
    if (verificationCode === generatedCode?.toString()) {
      setIsVerified(true);
      setTimer(0);
      alert("Verification successful!");
    } else {
      alert("Incorrect code, please try again.");
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle account creation
  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
      alert("Account created successfully!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        {/* Left Section: Updated Welcome Section */}
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

        {/* Right Section: Form */}
        <div className="relative p-10 md:p-14 flex flex-col justify-center space-y-6">
          {/* Cross Button for Navigation */}
          <button
            onClick={() => navigate("/auth")}
            className="absolute top-4 right-4 text-2xl text-gray-500 dark:text-gray-300 hover:text-red-500"
          >
            <FaTimes />
          </button>

          <h2 className="text-3xl font-bold text-center">Create an Account</h2>
          {/* User Type Selection */}
          <div className="mt-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Select User Type:</label>
            <select
              className="w-full p-3 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setIsCodeSent(false);
                setVerificationCode("");
                setIsVerified(false);
                setTimer(0);
              }}
            >
              <option>Participant</option>
              <option>Creator</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="mt-4 relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Verification for Creator/Admin */}
          {(userType === "Creator" || userType === "Admin") && !isVerified && (
            <>
              {!isCodeSent && (
                <button
                  onClick={sendVerificationCode}
                  className="w-full bg-transparent border border-blue-300 py-2 rounded-md mt-3 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  Send Verification Code
                </button>
              )}

              {isCodeSent && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full p-3 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={verifyCode}
                    className="w-full mt-3 py-2 border border-green-300 rounded-md hover:bg-green-500 hover:text-white transition"
                  >
                    {isVerified ? "Verified ✅" : "Verify"}
                  </button>
                  {timer > 0 && (
                    <p className="text-center text-sm mt-2 text-gray-600">
                      Resend code in <span className="text-blue-400 font-bold">{timer}s</span>
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Password Section */}
          {(userType === "Participant" || isVerified) && (
            <>
              <div className="mt-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 pr-10 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
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

              <div className="mt-4 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 pl-10 pr-10 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleCreateAccount}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-all"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
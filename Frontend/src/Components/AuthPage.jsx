import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaGoogle } from "react-icons/fa";
import { ThemeContext } from '../Context/ThemeContext';

const AuthPage = () => {

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
    <div className={`flex justify-center items-center min-h-screen p-6 `}>
      <div className={`flex w-full max-w-4xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white'} p-8 rounded-xl shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} space-x-8`}>
        {/* Left Section: Video & Welcome Text */}
        <div className={`w-1/2 flex flex-col items-center text-center ${isDarkMode ? 'text-white' : 'text-black'} p-6`}>
          <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>WELCOME TO EVENTHUB</h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>Discover amazing events and experiences near you.</p>
          <video
            src="https://cdn.pixabay.com/video/2022/11/27/140630-775595877_large.mp4"
            autoPlay
            loop
            muted
            className="rounded-lg shadow-lg w-full h-auto border border-gray-700"
          ></video>
          <h3 className={`text-xl font-semibold mt-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Connect with Us</h3>
          <div className={`social-container flex justify-center space-x-4 mt-3`}>
            <a href="#" className="social-icon text-blue-600 text-2xl hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="social-icon text-blue-400 text-2xl hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="social-icon text-pink-500 text-2xl hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="social-icon text-blue-700 text-2xl hover:text-blue-600"><FaLinkedin /></a>
            <a href="#" className="social-icon text-red-500 text-2xl hover:text-red-400"><FaYoutube /></a>
          </div>
        </div>
        {/* Right Section: Form */}
        <div className="w-1/2">
          <h2 className={`text-center text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Create an Account</h2>
          <p className={`text-center mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 cursor-pointer">
              Log in
            </Link>
          </p>

          {/* User Type Selection */}
          <div className="mt-4">
            <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select User Type:</label>
            <select
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-md focus:ring-2 focus:ring-blue-500`}
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
              className={`w-full p-3 pl-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>

          {/* Verification for Creator/Admin */}
          {(userType === "Creator" || userType === "Admin") && !isVerified && (
            <>
              {!isCodeSent && (
                <button
                  onClick={sendVerificationCode}
                  className={`w-full bg-transparent border ${isDarkMode ? 'border-blue-500 text-white' : 'border-blue-300 text-black'} py-2 rounded-md mt-3 hover:bg-blue-500 hover:text-white transition-all duration-300`}
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
                    className={`w-full p-3 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-md focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    onClick={verifyCode}
                    className={`w-full mt-3 py-2 border ${isDarkMode ? 'border-green-500 text-white' : 'border-green-300 text-black'} rounded-md hover:bg-green-500 hover:text-white transition`}
                  >
                    {isVerified ? "Verified ✅" : "Verify"}
                  </button>
                  {timer > 0 && (
                    <p className={`text-center text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
              <div className={`mt-4 relative`}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 pl-10 pr-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-md focus:ring-2 focus:ring-blue-500`}
                />
                <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
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
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-3 pl-10 pr-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-md focus:ring-2 focus:ring-blue-500`}
                />
                <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
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

              {passwordError && <p className={`text-red-500 text-sm mt-1`}>{passwordError}</p>}
            </>
          )}

          <button
            onClick={handleCreateAccount}
            className={`w-full bg-transparent border ${isDarkMode ? 'border-blue-500 text-white' : 'border-blue-300 text-black'} py-3 rounded-md mt-4 hover:bg-blue-500 hover:text-white transition-all duration-300`}
          >
            Create Account
          </button>

          {/* OR Separator */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-2 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Google Sign Up */}
          <button
            className={`w-full flex items-center justify-center bg-transparent border ${isDarkMode ? 'border-blue-500 text-white' : 'border-blue-300 text-black'} py-3 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300`}
          >
            <FaGoogle className="text-white-500 mr-2" /> Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
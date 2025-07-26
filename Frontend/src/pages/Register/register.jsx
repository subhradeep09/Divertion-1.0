import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, UserCircle, Eye, EyeOff } from 'lucide-react';

import { FaEyeSlash, FaEye, FaLock } from 'react-icons/fa';
import { showSuccess, showError } from '../../utils/toaster';
import axiosInstance from '../../utils/axiosInstance';
// const axiosInstance = {
//   post: async (url, data, config) => {
//     console.log('API Call:', url, data, config);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return { data: { message: "Registration successful!" } };
//   }
// };

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [role, setRole] = useState("attendee");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    return () => setIsAnimating(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFieldErrors({});
    
    if (!acceptedTerms) {
      showError("Please accept the terms and conditions");
      return;
    }

    const { fullname, username, email, phoneNumber, password, confirmPassword } = formData;
    
    // Validation (keep your existing validation logic)
    const errors = {};
    // Check required fields
    if (!fullname?.trim()) errors.fullname = "Full Name is required";
    if (!username?.trim()) errors.username = "Username is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!phoneNumber?.trim()) errors.phoneNumber = "Phone Number is required";
    if (!password?.trim()) errors.password = "Password is required";
    if (!confirmPassword?.trim()) errors.confirmPassword = "Confirm Password is required";
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email?.trim() && !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    // Password validations
    if (password?.trim() && password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    // Phone validation
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (phoneNumber?.trim() && !phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }
    // If there are errors, show them and return
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstError = Object.values(errors)[0];
      showError(firstError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axiosInstance.post(
        '/register',  // Changed from full URL to relative since baseURL is set
        {
          fullname: fullname.trim(),
          username: username.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          password,
          role,
        }
      );

      showSuccess(response.data.message || "Registered successfully");
      const userId = response?.data?.message?.userId;
      // console.log("Registration response data:", response.data);
      // console.log("Extracted userId:", userId);
      // Conditional navigation and storage
      if (userId) {
        // console.log("Navigating to OTP page with userId:", userId);
        localStorage.setItem("pendingUserId", userId);
        localStorage.setItem("pendingUserEmail", formData.email);
        navigate('/verify-otp', { state: { userId } });

        // Reset form AFTER navigation
        setFormData({
          fullname: '',
          username: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
        setRole("attendee");
        setAcceptedTerms(false);
        setFieldErrors({});
      } else {
        showError("Registration successful but no userId returned. Please try again.");
      }
    } catch (err) {
      console.error('Registration error:', err); // Add logging
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed";
      showError(errorMessage);
      
      // Handle backend validation errors
      if (err?.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] pt-[7rem] pb-10 overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-600/10 blur-[100px] transition-all duration-1000 ${isAnimating ? 'opacity-30' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px] transition-all duration-1200 ${isAnimating ? 'opacity-30' : 'opacity-0'}`}></div>
      </div>

      <div className={`flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-[#111113] backdrop-blur-sm border border-white/10 transition-all duration-500 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left Animated Welcome & Features - Enhanced UI */}
        <div className="md:w-1/2 relative bg-[#0a0a0a] p-10 flex items-center justify-center overflow-hidden">
          {/* Animated SVG and Gradients */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-pink-600/10 blur-[120px] animate-float-slow"></div>
            <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-pink-500/10 blur-[100px] animate-float"></div>
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,300 Q400,0 800,300 T1600,300" stroke="url(#linear)" strokeWidth="6" fill="none" />
              <defs>
                <linearGradient id="linear" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ec4899" />
                  <stop offset="1" stopColor="#db2777" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 text-center text-white space-y-6 max-w-md">
            <div className="mb-6">
              <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 bg-clip-text">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Divertion</span>
              </h2>
              <p className="text-white/70 text-sm mt-2">
                Explore an immersive 3D platform designed for creativity, privacy, and unmatched performance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Immersive 3D Experience</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Highly Secure</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Custom Avatars</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Smooth Animations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 bg-[#111113] flex items-center justify-center p-8 md:p-10 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
          <form className="w-full max-w-md space-y-5 z-10" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-pink-400 mb-2">
                Get Started
              </h2>
              <p className="text-white/60 text-sm">
                Create your account in just a few steps
              </p>
            </div>
            
            {/* Centered Role Selection Component */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-[10rem]">
                <label className="block text-sm font-medium text-white/70 mb-1 text-center">Select Your Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 block w-full rounded-full bg-[#1e1e21] border border-[#2e2e32] text-white/90 text-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500/30 focus:border-pink-500 transition-all text-center"
                >
                  <option value="attendee">Attendee</option>
                  <option value="organizer">Organizer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">
                  Full Name {fieldErrors.fullname && <span className="text-red-400">*</span>}
                </label>
                <div className={`flex items-center gap-3 bg-[#1e1e21] border rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30 ${
                  fieldErrors.fullname ? 'border-red-500 ring-1 ring-red-500/30' : 'border-[#2e2e32]'
                }`}>
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <UserCircle size={16} />
                  </span>
                  <input
                    type="text"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="John Doe"
                    value={formData.fullname}
                    onChange={e => handleInputChange('fullname', e.target.value)}
                  />
                </div>
                {fieldErrors.fullname && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.fullname}</p>
                )}
              </div>

              {/* Username */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">
                  Username {fieldErrors.username && <span className="text-red-400">*</span>}
                </label>
                <div className={`flex items-center gap-3 bg-[#1e1e21] border rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30 ${
                  fieldErrors.username ? 'border-red-500 ring-1 ring-red-500/30' : 'border-[#2e2e32]'
                }`}>
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={e => handleInputChange('username', e.target.value)}
                  />
                </div>
                {fieldErrors.username && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">
                  Email {fieldErrors.email && <span className="text-red-400">*</span>}
                </label>
                <div className={`flex items-center gap-3 bg-[#1e1e21] border rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30 ${
                  fieldErrors.email ? 'border-red-500 ring-1 ring-red-500/30' : 'border-[#2e2e32]'
                }`}>
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">
                  Phone Number {fieldErrors.phoneNumber && <span className="text-red-400">*</span>}
                </label>
                <div className={`flex items-center gap-3 bg-[#1e1e21] border rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30 ${
                  fieldErrors.phoneNumber ? 'border-red-500 ring-1 ring-red-500/30' : 'border-[#2e2e32]'
                }`}>
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <Phone size={16} />
                  </span>
                  <input
                    type="text"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={e => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
                {fieldErrors.phoneNumber && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.phoneNumber}</p>
                )}
              </div>

              {/* Password */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">
                  Password {fieldErrors.password && <span className="text-red-400">*</span>}
                </label>
                <div className={`relative flex items-center gap-3 bg-[#1e1e21] border rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30 ${
                  fieldErrors.password ? 'border-red-500 ring-1 ring-red-500/30' : 'border-[#2e2e32]'
                }`}>
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => handleInputChange('password', e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.password}</p>
                ) : (
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-white/40 ml-1">Minimum 8 characters</p>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-2 h-1 rounded-full bg-pink-500/30"></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">
                  Confirm Password {fieldErrors.confirmPassword && <span className="text-red-400">*</span>}
                </label>
                <div className={`relative flex items-center gap-3 bg-[#1e1e21] border rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30 ${
                  fieldErrors.confirmPassword ? 'border-red-500 ring-1 ring-red-500/30' : 'border-[#2e2e32]'
                }`}>
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mt-4 mb-1">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-[#3e3e42] bg-[#1e1e21] text-pink-500 focus:ring-pink-500 focus:ring-offset-[#1e1e21] transition-all hover:border-pink-400"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms" className="text-sm text-white/70 hover:text-white/90 transition-colors">
                  I agree to the <a href="/terms-of-service" className="text-pink-400 hover:underline hover:text-pink-300">Terms and Conditions</a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!acceptedTerms || isSubmitting}
              className={`w-full py-3 font-medium rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.01] mt-6 group relative overflow-hidden ${
                !acceptedTerms || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? 'Creating...' : 'Create Account'}
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            <p className="text-center text-sm text-white/60">
              Already have an account?{' '}
              <a href="/login" className="text-pink-400 hover:underline font-medium hover:text-pink-300 transition-colors">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
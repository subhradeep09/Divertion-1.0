import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    return () => setIsAnimating(false);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] pt-[5.5rem] overflow-hidden">
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
        <div className="md:w-1/2 bg-[#111113] flex items-center justify-center p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
          <form className="w-full max-w-md space-y-5 z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-pink-400 mb-2">
                Get Started
              </h2>
              <p className="text-white/60 text-sm">
                Create your account in just a few steps
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Full Name</label>
                <div className="flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30">
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <FaUserCircle />
                  </span>
                  <input
                    type="text"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Username</label>
                <div className="flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30">
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="johndoe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Email</label>
                <div className="flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30">
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Phone Number</label>
                <div className="flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30">
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <FaPhone />
                  </span>
                  <input
                    type="text"
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Password</label>
                <div className="relative flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30">
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-white/40 ml-1">Minimum 8 characters</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-2 h-1 rounded-full bg-pink-500/30"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="group col-span-1">
                <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Confirm Password</label>
                <div className="relative flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30">
                  <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#3e3e42] bg-[#1e1e21] text-pink-500 focus:ring-pink-500 focus:ring-offset-[#1e1e21] transition-all hover:border-pink-400"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms" className="text-sm text-white/70 hover:text-white/90 transition-colors">
                  I agree to the <a href="#" className="text-pink-400 hover:underline hover:text-pink-300">Terms and Conditions</a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 font-medium rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.01] mt-6 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Create Account
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            <p className="text-center text-sm text-white/60 mt-8">
              Already have an account?{' '}
              <a href="/login" className="text-pink-400 hover:underline font-medium hover:text-pink-300 transition-colors">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        /* Animated Orbs */
        @keyframes orb1 {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.05);}
        }
        @keyframes orb2 {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(12px) scale(1.1);}
        }
        @keyframes orb3 {
          0%,100% { transform: translate(0,0) scale(1);}
          50% { transform: translate(4px, -8px) scale(1.06);}
        }
        .animate-orb1 { animation: orb1 8s ease-in-out infinite; }
        .animate-orb2 { animation: orb2 10s ease-in-out infinite; }
        .animate-orb3 { animation: orb3 7s ease-in-out infinite; }
        /* 3D Cube Illusion */
        .cube-3d {
          position: relative;
          width: 2.5rem;
          height: 2.5rem;
          transform-style: preserve-3d;
          animation: cube-rotate 5s linear infinite;
        }
        .cube-3d:before, .cube-3d:after {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          border-radius: 0.3rem;
        }
        .cube-3d:before {
          background: linear-gradient(135deg, #e879f9 40%, #a78bfa 100%);
          opacity: 0.27;
          filter: blur(1px);
        }
        .cube-3d:after {
          background: linear-gradient(135deg, #f472b6 10%, #a21caf 70%);
          opacity: 0.22;
          filter: blur(6px);
          transform: scale(1.13) translateY(4px);
        }
        @keyframes cube-rotate {
          0% { transform: rotateX(18deg) rotateY(0deg);}
          100% { transform: rotateX(18deg) rotateY(360deg);}
        }
      `}</style>
    </div>
  );
};

export default Register;
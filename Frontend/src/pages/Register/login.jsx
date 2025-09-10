import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { showSuccess, showError } from '../../utils/toaster';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
    
    setIsAnimating(true);
    return () => setIsAnimating(false);
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login({ email, password });
      
      if (result.success) {
        showSuccess("Login successful");
        navigate('/'); // Navigate to home after successful login
      } else {
        showError(result.error);
        
        // Redirect to verification if needed
        if (result.error.includes('verify')) {
          navigate('/verify-account', { state: { email } });
        }
      }
    } catch (error) {
      showError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] pt-[5.5rem] overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-600/10 blur-[100px] transition-all duration-1000 ${isAnimating ? 'opacity-30' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px] transition-all duration-1200 ${isAnimating ? 'opacity-30' : 'opacity-0'}`}></div>
      </div>

      <div className={`flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-[#111113] backdrop-blur-sm border border-white/10 transition-all duration-500 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left Animated Welcome Section */}
        <div className="md:w-1/2 relative bg-[#0a0a0a] p-10 flex items-center justify-center overflow-hidden">
          {/* Animated SVG and Gradients */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-pink-600/10 blur-[120px] animate-float-slow"></div>
            <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-pink-500/10 blur-[100px] animate-float"></div>
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 极客时间 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div className="relative z-10 text-center text-white space-y-6极客时间 max-w-md">
            <div className="mb-6">
              <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-b极客时间 r from-pink-400 via-pink-500 to-pink-600 bg-clip-text">
                Welcome Back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Divertion</span>
              </h2>
              <p className="text-white/70 text-sm mt-2">
                Log in to access your personalized dashboard and continue your journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Personalized Feed</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Secure Access</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Saved Preferences</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition">
                <p className="text-sm text-white/80">Exclusive Content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="md:w-1/2 bg-[#111113] flex items-center justify-center p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
          <form className="w-full max-w-md space-y-5 z-10" onSubmit={handleLogin}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-pink-400 mb-2">
                Login to Your Account
              </h2>
              <p className="text-white/60 text-sm">
                Welcome back! Please enter your details
              </p>
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Email</label>
              <div className="flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-h极客时间 over:border-pink-500/50 focus-within:border-pink-500 focus-with极客时间 in:ring-1 focus-within:ring-pink-500/30">
                <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                  <FaUser />
                </span>
                <input
                  type="email"
                  className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-white/70 mb-1 ml-1 transition-all duration-200 group-focus-within:text-pink-400">Password</label>
              <div className="relative flex items-center gap-3 bg-[#1e1e21] border border-[#2e2e32] rounded-lg px-4 py-3 transition-all duration-200 group-hover:border-pink-500/50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500/30">
                <span className="w-5 h-5 flex items-center justify-center text-pink-400">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-transparent flex-1 text-white/90 placeholder:text-white/40 focus:outline-none text-sm"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.01] mt-6 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? 'Logging in...' : 'Login'}
                {!isLoading && (
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-white/60 mt-8">
              Don't have an account?{' '}
              <span
                onClick={() => !isLoading && navigate('/register')}
                className={`text-pink-400 hover:underline hover:text-pink-300 cursor-pointer transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Sign up
              </span>
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
      `}</style>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { showSuccess, showError } from '../utils/toaster';

const VerifyAccount = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If user is logged in but not verified, use their ID
    if (user && !user.isVerified) {
      setUserId(user._id);
    }
    
    // If coming from registration, get userId from location state
    if (location.state?.userId) {
      setUserId(location.state.userId);
    }
    
    // Check localStorage for temp user ID
    const storedUserId = localStorage.getItem('tempUserId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [user, location]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post('/verify-otp', { userId, otp });
      
      if (response.data.success) {
        showSuccess("Account verified successfully!");
        
        // If user is logged in, reload the page to update auth state
        if (user) {
          window.location.reload();
        } else {
          navigate('/login');
        }
      } else {
        showError(response.data.message || "Verification failed");
      }
    } catch (error) {
      showError(error.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axiosInstance.post('/resend-otp', { userId });
      setCanResend(false);
      showSuccess("OTP sent successfully!");
      setTimeout(() => setCanResend(true), 60000); // Enable resend after 60 seconds
    } catch (error) {
      showError(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Verify Your Account</h1>
        <p className="text-gray-300 mb-6">
          Enter the OTP sent to your email to verify your account.
        </p>
        
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter 6-digit OTP"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            {isLoading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={handleResendOtp}
            disabled={!canResend}
            className="text-pink-400 hover:text-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {canResend ? 'Resend OTP' : 'OTP sent. Wait 60 seconds to resend'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
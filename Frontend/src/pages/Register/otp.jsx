import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { FiLoader, FiCheck, FiAlertCircle } from 'react-icons/fi';

const OtpVerificationModal = ({ onVerified }) => {
  const navigate = useNavigate();

  const getStoredUserId = () => {
    try {
      const stored = localStorage.getItem("pendingUserId");
      if (!stored) return "";
      const parsed = JSON.parse(stored);
      return typeof parsed === "object" && parsed.userId ? parsed.userId : parsed;
    } catch {
      return localStorage.getItem("pendingUserId") || "";
    }
  };

  const [userId, setUserId] = useState(getStoredUserId);
  const [email, setEmail] = useState(localStorage.getItem("pendingUserEmail"));
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [activeInput, setActiveInput] = useState(0);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  // Initialize toast styles
  const toastStyles = {
    success: {
      style: {
        background: '#1f1f1f',
        color: '#f472b6',
        border: '1px solid #f472b6',
      },
      iconTheme: {
        primary: '#f472b6',
        secondary: '#1f1f1f',
      },
    },
    error: {
      style: {
        background: '#1f1f1f',
        color: '#f87171',
        border: '1px solid #f87171',
      },
      iconTheme: {
        primary: '#f87171',
        secondary: '#1f1f1f',
      },
    },
  };

  useEffect(() => {
    // Validate session on mount
    if (!userId || userId === 'undefined' || userId === 'null' || !email) {
      toast.error("Registration session expired. Please register again.", toastStyles.error);
      navigate('/register');
      return;
    }

    // Initialize countdown timer
    let startTime = parseInt(localStorage.getItem("otpStartTime") || Date.now(), 10);
    localStorage.setItem("otpStartTime", startTime.toString());

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(60 - elapsed, 0);
      setCountdown(remaining);
      if (remaining === 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [userId, email, navigate]);

  useEffect(() => {
    // Auto-focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-advance to next input
      if (value !== '' && index < 5) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 10);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    
    // Validate OTP length
    if (code.length !== 6) {
      setMessage({ text: 'Please enter a 6-digit code', type: 'error' });
      return;
    }

    setIsVerifying(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await axiosInstance.post('/verify-otp', {
        userId: typeof userId === "object" ? userId._id : userId,
        otp: code,
      });

      if (res.data.success) {
        toast.success(res.data.data || "OTP verified successfully", toastStyles.success);
        localStorage.removeItem("pendingUserId");
        localStorage.removeItem("pendingUserEmail");
        localStorage.removeItem("otpStartTime");
        onVerified?.();
        navigate('/login');
      } else {
        setMessage({ text: res.data.message || "OTP verification failed", type: 'error' });
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      const errorMsg = err.response?.data?.message || 'Invalid or expired OTP';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    setMessage({ text: '', type: '' });

    try {
      await axiosInstance.post('/resend-otp', { 
        userId: typeof userId === "object" ? userId._id : userId 
      });
      setMessage({ text: 'New OTP sent successfully!', type: 'success' });
      localStorage.setItem("otpStartTime", Date.now().toString());
      setCountdown(60);
      const startTime = Date.now();
      localStorage.setItem("otpStartTime", startTime.toString());
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(60 - elapsed, 0);
        setCountdown(remaining);
        if (remaining === 0) clearInterval(timer);
      }, 1000);
    } catch (err) {
      setMessage({ text: 'Failed to resend OTP', type: 'error' });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-br from-[#0a0a0a]/90 to-[#1a0b1e]/90 backdrop-blur-lg">
      <div className="bg-[#0e0e0f]/90 rounded-2xl p-8 w-full max-w-md text-center border border-pink-500/20 shadow-2xl">
        <h2 className="text-pink-400 text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-sm text-white/70 mb-6">
          We've sent a 6-digit code to <span className="font-medium text-white">{email}</span>
        </p>
        
        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setActiveInput(index)}
              className="w-10 h-12 text-center text-lg rounded-lg bg-[#2e2e32] text-white border border-pink-500/20 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              disabled={isVerifying}
            />
          ))}
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`flex items-center justify-center gap-2 mb-4 text-sm ${
            message.type === 'error' ? 'text-pink-400' : 'text-green-400'
          }`}>
            {message.type === 'error' ? (
              <FiAlertCircle className="flex-shrink-0" />
            ) : (
              <FiCheck className="flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.join('').length !== 6}
          className={`w-full py-3 rounded-md font-semibold transition mb-4 flex items-center justify-center gap-2 ${
            isVerifying
              ? 'bg-pink-700 cursor-not-allowed'
              : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          {isVerifying ? (
            <>
              <FiLoader className="animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>

        {/* Resend OTP */}
        <div className="text-sm text-white/60">
          Didn't receive the code?{' '}
          {countdown > 0 ? (
            <span className="text-pink-400">Resend in {countdown}s</span>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-pink-400 hover:underline hover:text-pink-300 disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
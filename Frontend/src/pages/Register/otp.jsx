import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'; // adjust path if needed
import { toast } from 'react-hot-toast';

const showSuccess = (message) => {
  toast.success(message || 'Success!', {
    style: {
      background: '#1f1f1f',
      color: '#f472b6',
      border: '1px solid #f472b6',
    },
    iconTheme: {
      primary: '#f472b6',
      secondary: '#1f1f1f',
    },
  });
};

const showError = (message) => {
  toast.error(message || 'Something went wrong!', {
    style: {
      background: '#1f1f1f',
      color: '#f87171',
      border: '1px solid #f87171',
    },
    iconTheme: {
      primary: '#f87171',
      secondary: '#1f1f1f',
    },
  });
};

const OtpVerificationModal = ({ onVerified }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("pendingUserId"));
  const [email, setEmail] = useState(localStorage.getItem("pendingUserEmail"));
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [activeInput, setActiveInput] = useState(0);
  const [message, setMessage] = useState('');
  const lastResendTime = useRef(0);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!userId || userId === 'undefined' || userId === 'null') {
      showError("Registration session expired. Please register again.");
      navigate('/register');
      return;
    }

    const storedStart = localStorage.getItem("otpStartTime");
    const now = Date.now();
    let startTime;

    if (storedStart && !isNaN(parseInt(storedStart))) {
      startTime = parseInt(storedStart);
    } else {
      startTime = now;
      localStorage.setItem("otpStartTime", startTime.toString());
    }

    const getRemainingTime = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      return Math.max(60 - elapsed, 0);
    };

    const updateCountdown = () => {
      const remaining = getRemainingTime();
      setCountdown(remaining);
      setResendAvailable(remaining === 0);
      if (remaining === 0) clearInterval(timer);
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, [userId, navigate]);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < 5) {
        const nextInput = document.querySelector(`#otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');

    if (!userId || userId === 'undefined' || userId === 'null') {
      showError("Registration session expired. Please register again.");
      navigate('/register');
      return;
    }

    try {
      const res = await axiosInstance.post('/verify-otp', {
        userId,
        otp: code,
      });

      if (res.data.success) {
        showSuccess(res.data.data || "OTP verified successfully");
        localStorage.removeItem("pendingUserId");
        localStorage.removeItem("pendingUserEmail");
        localStorage.removeItem("otpStartTime");
        onVerified && onVerified();
        navigate('/login');
      } else {
        setMessage(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setMessage(err.response?.data?.message || 'Invalid or expired OTP');
      if (typeof err.response?.data?.message === 'object' && err.response.data.message?.userId) {
        setMessage('Verification failed for user ID: ' + err.response.data.message.userId);
      }
    }
  };

  const handleResend = async () => {
    const now = Date.now();
    if (!resendAvailable) {
      setMessage("Please wait for the countdown to finish before resending.");
      return;
    }
    try {
      await axiosInstance.post('/resend-otp', {
        userId: localStorage.getItem("pendingUserId"),
      });
      setMessage('OTP resent!');
      localStorage.setItem("otpStartTime", now.toString());
      setCountdown(60);
      setResendAvailable(false);
    } catch (err) {
      setMessage('Failed to resend OTP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-br from-[#0a0a0a]/90 to-[#1a0b1e]/90 backdrop-blur-lg">
      <div className="bg-[#0e0e0f]/90 rounded-2xl p-8 w-full max-w-md text-center border border-pink-500/20 shadow-2xl">
        <h2 className="text-pink-400 text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-sm text-white/70 mb-6">We’ve sent a 6-digit code to <span className="font-medium text-white">{email}</span></p>
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              id={`otp-input-${index}`}
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => {
                const isBackspaceOrDelete = e.key === 'Backspace' || e.key === 'Delete';
                const currentValue = otp[index];

                if (isBackspaceOrDelete) {
                  const newOtp = [...otp];
                  if (currentValue === '') {
                    if (index > 0) {
                      const prevInput = document.querySelector(`#otp-input-${index - 1}`);
                      if (prevInput) {
                        prevInput.focus();
                        newOtp[index - 1] = '';
                        setOtp(newOtp);
                      }
                    }
                  } else {
                    newOtp[index] = '';
                    setOtp(newOtp);
                  }
                }
              }}
              onFocus={() => setActiveInput(index)}
              className="w-10 h-12 text-center text-lg rounded-lg bg-[#2e2e32] text-white border border-pink-500/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus={index === activeInput}
            />
          ))}
        </div>
        {message && <p className="text-xs text-pink-400 mb-2">{message}</p>}
        <button
          onClick={handleVerify}
          className="w-full py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 transition mb-3"
        >
          Verify OTP
        </button>
        <div className="text-sm text-white/60">
          Didn’t get the code?{' '}
          {!resendAvailable ? (
            <span className="text-pink-400 ml-1">{`Resend in ${countdown}s`}</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-pink-400 hover:underline hover:text-pink-300"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
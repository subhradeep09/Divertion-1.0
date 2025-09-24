import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Auto logout configuration
  const AUTO_LOGOUT_TIME = 1 * 24 * 60 * 60 * 1000; // 1 days in milliseconds
  const inactivityTimerRef = useRef(null);
  const lastActivityTimeRef = useRef(Date.now());

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        const loginTime = localStorage.getItem('loginTime');
        
        // Check if session has expired
        const currentTime = Date.now();
        const sessionAge = currentTime - parseInt(loginTime || 0);
        
        if (storedUser && storedUser !== "undefined" && accessToken && sessionAge < AUTO_LOGOUT_TIME) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser);
            setIsAuthenticated(true);
            
            // Start inactivity monitoring
            startInactivityMonitoring();
            resetInactivityTimer();
          } else {
            clearAuth();
          }
        } else {
          // Session expired or invalid
          if (sessionAge >= AUTO_LOGOUT_TIME) {
            console.log('Session expired due to time limit');
          }
          clearAuth();
        }
      } catch (error) {
        console.error("Error loading user:", error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Listen for storage changes (e.g., from other tabs)
    const handleStorage = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorage);
    
    // Set up activity listeners
    setupActivityListeners();
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      cleanupActivityListeners();
      clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Set up activity detection
  const setupActivityListeners = () => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });
  };

  // Clean up activity listeners
  const cleanupActivityListeners = () => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.removeEventListener(event, resetInactivityTimer, true);
    });
  };

  // Start inactivity monitoring
  const startInactivityMonitoring = () => {
    lastActivityTimeRef.current = Date.now();
    resetInactivityTimer();
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    lastActivityTimeRef.current = Date.now();
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Set timer to check for inactivity every minute
    inactivityTimerRef.current = setTimeout(() => {
      checkInactivity();
    }, 60000); // Check every minute
  };

  // Check if user has been inactive for too long
  const checkInactivity = () => {
    if (!isAuthenticated) return;
    
    const currentTime = Date.now();
    const timeSinceLastActivity = currentTime - lastActivityTimeRef.current;
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0');
    const totalSessionTime = currentTime - loginTime;
    
    // Check total session time (7 days max)
    if (totalSessionTime >= AUTO_LOGOUT_TIME) {
      console.log('Auto logout: Maximum session time reached');
      autoLogout('Your session has expired due to inactivity. Please login again.');
      return;
    }
    
    // Check for recent inactivity (optional - you can adjust this)
    const MAX_INACTIVITY_TIME = 60 * 60 * 1000; // 1 hour of inactivity
    if (timeSinceLastActivity >= MAX_INACTIVITY_TIME) {
      console.log('Auto logout: User inactive for too long');
      autoLogout('You have been logged out due to inactivity.');
      return;
    }
    
    // Continue monitoring
    resetInactivityTimer();
  };

  // Automatic logout function
  const autoLogout = async (message = 'Session expired') => {
    try {
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error("Auto logout error:", error);
    } finally {
      // Show notification if needed
      if (window.showNotification) {
        window.showNotification(message, 'info');
      }
      
      clearAuth();
      window.location.href = '/login?message=' + encodeURIComponent(message);
    }
  };

  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loginTime');
    
    // Clear timers and listeners
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    cleanupActivityListeners();
  };

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      
      if (response.data.success) {
        const { user: userData, accessToken, refreshToken } = response.data.message;
        
        // Check if user is banned
        if (userData.isBanned) {
          throw new Error("Your account has been banned. Contact support.");
        }
        
        // Check if user is verified
        if (!userData.isVerified) {
          throw new Error("Please verify your account before logging in.");
        }

        // Store login time for session management
        const loginTime = Date.now();
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('loginTime', loginTime.toString());
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Start inactivity monitoring
        startInactivityMonitoring();
        resetInactivityTimer();
        
        return { success: true, user: userData };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = error.response?.data?.message || error.message || "Login failed";
      
      // Handle specific error cases
      if (error.response?.status === 403) {
        if (errorMessage.includes('banned')) {
          errorMessage = "Your account has been banned. Contact support.";
        } else if (errorMessage.includes('verify')) {
          errorMessage = "Please verify your account before logging in.";
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
      window.location.href = '/login';
    }
  };

  // Function to manually extend session (call this when user performs important actions)
  const extendSession = () => {
    if (isAuthenticated) {
      lastActivityTimeRef.current = Date.now();
      resetInactivityTimer();
    }
  };

  // Function to get remaining session time
  const getRemainingSessionTime = () => {
    if (!isAuthenticated) return 0;
    
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0');
    const currentTime = Date.now();
    const elapsedTime = currentTime - loginTime;
    const remainingTime = AUTO_LOGOUT_TIME - elapsedTime;
    
    return Math.max(0, remainingTime);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    clearAuth,
    extendSession,
    getRemainingSessionTime
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
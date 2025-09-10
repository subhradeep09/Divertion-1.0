import React, { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        
        if (storedUser && storedUser !== "undefined" && accessToken) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser);
            setIsAuthenticated(true);
          } else {
            clearAuth();
          }
        } else {
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
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        setUser(userData);
        setIsAuthenticated(true);
        
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

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    clearAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
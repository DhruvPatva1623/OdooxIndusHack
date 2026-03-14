import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('access_token');
    if (token) {
      // Since we don't have a /me endpoint right now, we can decode the JWT
      // but for simplicity we will just assume logged in if token exists.
      // Ideally we would fetch user details here.
      setCurrentUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Assuming FastAPI expects standard JSON for this endpoint based on our schemas
      const response = await api.post('/auth/login', { email, password });
      const { access_token, refresh_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      
      setCurrentUser({ email, token: access_token });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error?.message || 'Failed to login' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      await api.post('/auth/signup', userData);
      // Auto-login after signup
      return await login(userData.email, userData.password);
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error?.message || 'Failed to sign up' 
      };
    }
  };

  const logout = async () => {
    try {
      // Optional: Call logout endpoint to invalidate refresh token on server
      await api.post('/auth/logout');
    } catch (e) {
      console.error("Logout API failed", e);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

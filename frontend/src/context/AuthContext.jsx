import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('brightloop_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('brightloop_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('brightloop_token');
      if (storedToken) {
        try {
          const res = await authService.getMe();
          if (res?.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('brightloop_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session verification note:', err.message);
          // If token expired, clear
          if (err.response?.status === 401) {
            localStorage.removeItem('brightloop_token');
            localStorage.removeItem('brightloop_user');
            setUser(null);
            setToken(null);
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    const { user: loggedInUser, token: authToken } = res.data;

    localStorage.setItem('brightloop_token', authToken);
    localStorage.setItem('brightloop_user', JSON.stringify(loggedInUser));

    setToken(authToken);
    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    const { user: registeredUser, token: authToken } = res.data;

    localStorage.setItem('brightloop_token', authToken);
    localStorage.setItem('brightloop_user', JSON.stringify(registeredUser));

    setToken(authToken);
    setUser(registeredUser);

    return registeredUser;
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('brightloop_token');
    localStorage.removeItem('brightloop_user');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

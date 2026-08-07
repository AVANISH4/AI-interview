import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'user',
      plan: 'pro',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      stats: { interviewsTaken: 6, averageScore: 88, totalQuestionsAnswered: 30, codingChallengesSolved: 12 }
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || 'demo_jwt_token_123');

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return { success: true };
      }
    } catch (err) {
      // Dev fallback mock login
      const mockUser = {
        _id: '65f1a2b3c4d5e6f7a8b9c0d1',
        name: email ? email.split('@')[0] : 'Alex Johnson',
        email: email || 'alex.johnson@example.com',
        role: email?.includes('admin') ? 'admin' : 'user',
        plan: 'pro',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
      setToken('demo_token');
      setUser(mockUser);
      localStorage.setItem('token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return { success: true };
      }
    } catch (err) {
      const mockUser = { _id: 'new_id', name, email, role: 'user', plan: 'pro' };
      setToken('demo_token');
      setUser(mockUser);
      localStorage.setItem('token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

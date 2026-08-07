import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res?.success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary p-0.5 shadow-glow-purple flex items-center justify-center mb-3">
            <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-brand-purple" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-slate-400 mt-1">Log in to continue your AI mock interviews</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs text-rose-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.johnson@example.com"
                className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-brand-purple hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-sm"
              />
            </div>
          </div>

          <button type="submit" className="mt-2 btn-gradient py-3 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center justify-center gap-2">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-xs text-slate-500 font-semibold uppercase">Or Continue With</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full glass-card py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2"
        >
          <Chrome className="w-4 h-4 text-rose-400" /> Google OAuth Sign In
        </button>

        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account? <Link to="/register" className="text-brand-purple font-semibold hover:underline">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Sun, Moon, LogOut, User, LayoutDashboard, Crown, Search, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3 backdrop-blur-md bg-dark-bg/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary p-0.5 shadow-glow-purple flex items-center justify-center">
            <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-purple group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-purple bg-clip-text text-transparent">
            AI Interview <span className="text-brand-purple">Pro</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/features" className="hover:text-white transition-colors">Features</Link>
          <Link to="/companies" className="hover:text-white transition-colors">Companies</Link>
          <Link to="/coding" className="hover:text-white transition-colors">Coding Lab</Link>
          <Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
          <Link to="/pricing" className="hover:text-white transition-colors flex items-center gap-1 text-amber-400">
            <Crown className="w-4 h-4" /> Pricing
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white hover:border-brand-purple/40 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/dashboard" 
                className="btn-gradient px-4 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2 shadow-lg"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-brand-purple/50 object-cover" />
                </Link>
                <button 
                  onClick={logout}
                  aria-label="Logout"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2">
                Log In
              </Link>
              <Link to="/register" className="btn-gradient px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-glow-purple">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl glass-card text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-3 px-2 pb-4">
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 py-2">Dashboard</Link>
          <Link to="/companies" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 py-2">Companies</Link>
          <Link to="/coding" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 py-2">Coding Lab</Link>
          <Link to="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 py-2">Leaderboard</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-amber-400 font-semibold py-2">Pricing</Link>
          {user ? (
            <button onClick={logout} className="text-rose-400 font-semibold py-2 text-left">Log Out</button>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 glass-card rounded-xl">Log In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 btn-gradient rounded-xl font-semibold">Get Started Free</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

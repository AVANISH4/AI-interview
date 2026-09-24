import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import { 
  Sparkles, Sun, Moon, LogOut, User, LayoutDashboard, Crown, Search, Menu, X,
  Smartphone, Wifi, Copy, Check, Globe, Laptop, Radio, ArrowRight, ExternalLink
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [localIp, setLocalIp] = useState('10.188.207.11');
  const [copiedMobileUrl, setCopiedMobileUrl] = useState(false);

  useEffect(() => {
    api.get('/network-ip')
      .then(res => {
        if (res.data && res.data.localIp) {
          setLocalIp(res.data.localIp);
        }
      })
      .catch(() => {});
  }, []);

  const mobileUrl = `http://${localIp || '10.188.207.11'}:3000`;

  const handleCopyMobileUrl = () => {
    navigator.clipboard.writeText(mobileUrl);
    setCopiedMobileUrl(true);
    setTimeout(() => setCopiedMobileUrl(false), 3000);
  };

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

        {/* Actions & Mobile Connect Button */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Mobile & External Laptop Connect Button */}
          <button
            onClick={() => setConnectModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all shadow-glow-purple"
            title="Connect mobile phone or external laptop"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Connect Mobile / Phone</span>
          </button>

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
          <button
            onClick={() => {
              setConnectModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" /> Connect Mobile Phone / External Laptop
          </button>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 py-2">Dashboard</Link>
          <Link to="/features" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 py-2">Features Stack</Link>
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

      {/* Mobile Phone & External Computer Connection Modal */}
      {connectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full rounded-3xl p-6 border border-white/10 flex flex-col gap-5 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Connect External Mobile / Laptop</h3>
                  <p className="text-[11px] text-slate-400">Give live interviews on phone or external device</p>
                </div>
              </div>
              <button
                onClick={() => setConnectModalOpen(false)}
                className="p-1.5 rounded-xl glass-card text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction Option 1: Wi-Fi Direct Connection */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                  <Wifi className="w-4 h-4" /> Option 1: Same Wi-Fi Network (LAN)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">Recommended</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your Mobile Phone to the <strong className="text-white">same Wi-Fi network</strong> as your laptop, then open your mobile browser (Chrome/Safari) and go to:
              </p>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  readOnly
                  value={mobileUrl}
                  className="glass-input rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400 flex-1 bg-slate-950 border border-emerald-500/40"
                />
                <button
                  onClick={handleCopyMobileUrl}
                  className="px-4 py-2 rounded-xl bg-gradient-primary text-white font-extrabold text-xs flex items-center gap-1.5 shadow-glow-purple hover:opacity-90 transition-all"
                >
                  {copiedMobileUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedMobileUrl ? 'Copied!' : 'Copy Mobile Link'}
                </button>
              </div>
            </div>

            {/* Instruction Option 2: Cellular Data (4G / 5G / Remote Mobile) */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
              <span className="text-xs font-extrabold text-brand-purple flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-purple" /> Option 2: 4G / 5G Mobile Data (Public Tunnel)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                If the candidate's mobile phone is using <strong className="text-slate-200">Cellular 4G/5G Data</strong> outside your Wi-Fi, run this command in PowerShell to get a instant global link:
              </p>
              <code className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 select-all">
                npx localtunnel --port 3000
              </code>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setConnectModalOpen(false)}
              className="w-full py-2.5 rounded-2xl glass-card text-xs font-bold text-slate-300 hover:text-white"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

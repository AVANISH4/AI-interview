import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, PlayCircle, Building2, Code2, FileText, 
  BarChart3, Bookmark, Trophy, Crown, ShieldAlert, User, LogOut 
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Start Interview', path: '/interview/setup', icon: PlayCircle },
    { label: 'Company Tracks', path: '/companies', icon: Building2 },
    { label: 'Coding Lab', path: '/coding', icon: Code2 },
    { label: 'Resume Interview', path: '/resume-interview', icon: FileText },
    { label: 'Performance', path: '/analytics', icon: BarChart3 },
    { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { label: 'Upgrade Pro', path: '/pricing', icon: Crown, highlight: true },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin Panel', path: '/admin', icon: ShieldAlert });
  }

  return (
    <aside className="w-64 glass-panel border-r border-white/10 hidden lg:flex flex-col justify-between p-4 h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="flex flex-col gap-1.5">
        <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Platform Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-blue/20 to-brand-purple/30 text-white border border-brand-purple/50 shadow-glow-purple'
                    : item.highlight
                    ? 'text-amber-300 hover:bg-amber-500/10 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`
              }
            >
              <Icon className={`w-4 h-4 ${item.highlight ? 'text-amber-400' : ''}`} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Profile Bar */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <NavLink to="/profile" className="flex items-center gap-2.5 overflow-hidden">
          <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover border border-brand-purple" />
          <div className="flex flex-col truncate">
            <span className="text-sm font-semibold text-slate-200 truncate">{user?.name}</span>
            <span className="text-xs text-brand-purple capitalize font-medium">{user?.plan} Member</span>
          </div>
        </NavLink>
        <button 
          onClick={logout} 
          title="Log Out"
          className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

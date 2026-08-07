import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Award, BookOpen, Tag, Briefcase, Plus, Save, Sparkles, CheckCircle2 } from 'lucide-react';

export const UserProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Johnson');
  const [skills, setSkills] = useState(user?.skills || ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Tailwind CSS']);
  const [newSkill, setNewSkill] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...user, name, skills };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Candidate Profile
        </div>
        <h1 className="text-3xl font-extrabold text-white">Manage Profile & Experience</h1>
        <p className="text-sm text-slate-400 mt-1">Keep your skills and resume up to date for personalized AI interview generation.</p>
      </div>

      <form onSubmit={handleSave} className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col gap-6">
        
        {/* Avatar Header */}
        <div className="flex items-center gap-5 border-b border-slate-800 pb-6">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full border-2 border-brand-purple object-cover shadow-glow-purple" />
          <div>
            <h3 className="font-extrabold text-xl text-white">{name}</h3>
            <p className="text-xs text-brand-purple font-semibold capitalize">{user?.plan || 'pro'} Tier Candidate</p>
            <span className="text-xs text-slate-400 mt-1 block">{user?.email}</span>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full glass-input rounded-xl py-2.5 px-4 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Email Address</label>
            <input 
              type="email" 
              disabled
              value={user?.email || 'alex.johnson@example.com'}
              className="w-full glass-input rounded-xl py-2.5 px-4 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Skills Tag Manager */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Technical Skills Cloud</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((s, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 flex items-center gap-2">
                {s}
                <button type="button" onClick={() => handleRemoveSkill(s)} className="text-rose-400 hover:text-rose-300">×</button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill tag (e.g. GraphQL)..."
              className="glass-input rounded-xl py-2 px-3 text-xs flex-1"
            />
            <button 
              type="button" 
              onClick={handleAddSkill}
              className="glass-card px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white border border-white/10"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Action Save Button */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {saved && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Profile updated!
            </span>
          )}
          <button type="submit" className="btn-gradient px-6 py-3 rounded-xl text-xs font-bold text-white shadow-glow-purple ml-auto flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </div>

      </form>

    </div>
  );
};

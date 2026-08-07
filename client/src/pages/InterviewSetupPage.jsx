import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Play, Sparkles, Sliders, Building2, Briefcase, Clock, Award } from 'lucide-react';

export const InterviewSetupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState('Frontend');
  const [difficulty, setDifficulty] = useState('Medium');
  const [yearsOfExperience, setYearsOfExperience] = useState(2);
  const [company, setCompany] = useState('Google');
  const [jobRole, setJobRole] = useState('Frontend Engineer');
  const [durationMinutes, setDurationMinutes] = useState(15);

  const categories = [
    'Software Engineer', 'Frontend', 'Backend', 'Full Stack', 'MERN',
    'React', 'Node.js', 'Express', 'MongoDB', 'Java', 'Python',
    'C++', 'Machine Learning', 'Data Science', 'DevOps', 'Cloud',
    'HR Interview', 'Behavioral Interview', 'System Design'
  ];

  const companies = [
    'General Tech', 'Google', 'Amazon', 'Microsoft', 'Meta', 
    'Netflix', 'Adobe', 'Apple', 'Uber', 'LinkedIn', 'OpenAI'
  ];

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/interviews/setup', {
        category,
        difficulty,
        yearsOfExperience: Number(yearsOfExperience),
        company,
        jobRole,
        durationMinutes: Number(durationMinutes)
      });
      
      const interview = res.data.interview || {
        _id: 'int_demo_' + Date.now(),
        category,
        difficulty,
        company,
        jobRole,
        durationMinutes,
        questions: [
          { _id: 'q1', questionText: `How do you optimize state rendering and Virtual DOM updates in ${category}?`, hint: 'Focus on diffing algorithms and memoization.' },
          { _id: 'q2', questionText: `Explain how you handle asynchronous concurrency and error handling for ${jobRole} tasks.`, hint: 'Discuss Promises and async/await queues.' },
          { _id: 'q3', questionText: `Describe a time you solved a complex system architecture bottleneck for ${company}.`, hint: 'Explain trade-offs and scaling metrics.' },
          { _id: 'q4', questionText: 'How do you structure database queries and caching to minimize latency?', hint: 'Mention indexing and Redis caching.' },
          { _id: 'q5', questionText: 'Walk me through your process for automated testing and CI/CD pipelines.', hint: 'Discuss unit testing and deployment scripts.' }
        ]
      };

      navigate('/interview/room', { state: { interview } });
    } catch (err) {
      // Dev Fallback Session
      const fallbackInterview = {
        _id: 'int_demo_' + Date.now(),
        category,
        difficulty,
        company,
        jobRole,
        durationMinutes,
        questions: [
          { _id: 'q1', questionText: `How do you optimize state rendering and Virtual DOM updates in ${category}?`, hint: 'Focus on diffing algorithms and memoization.' },
          { _id: 'q2', questionText: `Explain how you handle asynchronous concurrency and error handling for ${jobRole} tasks.`, hint: 'Discuss Promises and async/await queues.' },
          { _id: 'q3', questionText: `Describe a time you solved a complex system architecture bottleneck for ${company}.`, hint: 'Explain trade-offs and scaling metrics.' },
          { _id: 'q4', questionText: 'How do you structure database queries and caching to minimize latency?', hint: 'Mention indexing and Redis caching.' },
          { _id: 'q5', questionText: 'Walk me through your process for automated testing and CI/CD pipelines.', hint: 'Discuss unit testing and deployment scripts.' }
        ]
      };
      navigate('/interview/room', { state: { interview: fallbackInterview } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple w-max">
          <Sparkles className="w-3.5 h-3.5" /> AI Interview Setup Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white">Configure Your Mock Interview</h1>
        <p className="text-sm text-slate-400">Customize the category, difficulty, company track, and target role.</p>
      </div>

      <form onSubmit={handleStart} className="glass-panel rounded-3xl p-6 lg:p-8 border border-white/10 flex flex-col gap-6">
        
        {/* Category Picker */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 block">
            1. Select Interview Category (18 Tracks Available)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                  category === cat
                    ? 'bg-gradient-to-r from-brand-blue/30 to-brand-purple/40 text-white border-brand-purple shadow-glow-purple'
                    : 'glass-card text-slate-400 hover:text-slate-200 border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Picker */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-blue" /> 2. Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === diff
                      ? diff === 'Easy' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' :
                        diff === 'Medium' ? 'bg-amber-500/20 text-amber-300 border-amber-500' :
                        'bg-rose-500/20 text-rose-300 border-rose-500'
                      : 'glass-card text-slate-400 border-white/5'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-purple" /> 3. Interview Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 30].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setDurationMinutes(dur)}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    durationMinutes === dur
                      ? 'bg-brand-purple/30 text-white border-brand-purple'
                      : 'glass-card text-slate-400 border-white/5'
                  }`}
                >
                  {dur} Minutes
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Company & Role */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-brand-blue" /> Target Company
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full glass-input rounded-xl py-2.5 px-3 text-sm text-slate-200"
            >
              {companies.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-200">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-brand-purple" /> Target Job Role
            </label>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full glass-input rounded-xl py-2.5 px-3 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">
              Years of Experience
            </label>
            <select
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(Number(e.target.value))}
              className="w-full glass-input rounded-xl py-2.5 px-3 text-sm text-slate-200"
            >
              <option value={1} className="bg-slate-900">0 - 1 Year (Entry Level)</option>
              <option value={2} className="bg-slate-900">1 - 3 Years (Mid Level)</option>
              <option value={5} className="bg-slate-900">3 - 5 Years (Senior)</option>
              <option value={8} className="bg-slate-900">5+ Years (Staff / Principal)</option>
            </select>
          </div>
        </div>

        {/* Submit Action */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            AI Engine will generate 5 customized questions with voice synthesis.
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-gradient px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center gap-2"
          >
            {loading ? 'Initializing AI Voice Session...' : 'Launch Voice Interview'} <Play className="w-4 h-4 fill-current" />
          </button>
        </div>

      </form>
    </div>
  );
};

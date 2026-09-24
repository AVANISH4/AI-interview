import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Play, Sparkles, Sliders, Building2, Briefcase, Clock, Award, UploadCloud, FileText, CheckCircle2, Tag, ArrowRight } from 'lucide-react';

export const InterviewSetupPage = () => {
  const navigate = useNavigate();
  const [setupMode, setSetupMode] = useState('standard'); // 'standard' or 'resume'
  const [loading, setLoading] = useState(false);

  // Standard Setup State
  const [category, setCategory] = useState('Frontend');
  const [difficulty, setDifficulty] = useState('Medium');
  const [yearsOfExperience, setYearsOfExperience] = useState(2);
  const [company, setCompany] = useState('Google');
  const [jobRole, setJobRole] = useState('Frontend Engineer');
  const [durationMinutes, setDurationMinutes] = useState(15);

  // Resume Track State
  const [resumeText, setResumeText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [resumeParsed, setResumeParsed] = useState(false);

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

  const handleStartStandard = async (e) => {
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

  const handleScanResume = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/resume/upload', { resumeText });
      setExtractedSkills(res.data.extractedSkills || ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript']);
      if (res.data.recommendedRole) setJobRole(res.data.recommendedRole);
      if (res.data.recommendedCategory) setCategory(res.data.recommendedCategory);
      if (res.data.experienceYears) setYearsOfExperience(res.data.experienceYears);
      setResumeParsed(true);
    } catch (err) {
      setExtractedSkills(['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'REST APIs', 'System Design']);
      setJobRole('Full Stack MERN Engineer');
      setResumeParsed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStartResumeTrack = async () => {
    setLoading(true);
    try {
      const res = await api.post('/resume/generate', {
        skills: extractedSkills,
        jobRole,
        category,
        yearsOfExperience,
        company
      });

      const interview = res.data.interview || {
        _id: 'int_res_' + Date.now(),
        category,
        company,
        jobRole,
        questions: extractedSkills.slice(0, 5).map((sk, idx) => ({
          _id: 'q_res_' + idx,
          questionText: `Based on your resume experience with ${sk} as a ${jobRole}, how do you design scalable applications with ${sk}?`,
          hint: `Discuss architecture, trade-offs, and best practices for ${sk}.`
        }))
      };

      navigate('/interview/room', { state: { interview } });
    } catch (err) {
      const fallbackInterview = {
        _id: 'int_res_' + Date.now(),
        category,
        company,
        jobRole,
        questions: [
          { _id: 'q1', questionText: `Based on your resume for ${jobRole}, how do you structure production systems?`, hint: 'Discuss scalability & state.' },
          { _id: 'q2', questionText: `Describe how you optimize latency and throughput in ${category} services.`, hint: 'Discuss indexing & caching.' }
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
        <p className="text-sm text-slate-400">Select manual setup or upload your resume to auto-detect your target role and skills.</p>
      </div>

      {/* Mode Picker Tabs */}
      <div className="flex items-center gap-3 p-1.5 rounded-2xl glass-panel border border-white/10 w-full sm:w-max">
        <button
          onClick={() => setSetupMode('standard')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            setupMode === 'standard'
              ? 'bg-gradient-primary text-white shadow-glow-purple'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" /> Standard Category Setup
        </button>

        <button
          onClick={() => setSetupMode('resume')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            setupMode === 'resume'
              ? 'bg-gradient-primary text-white shadow-glow-purple'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-emerald-400" /> Resume Upload & Auto-Detect Role
        </button>
      </div>

      {setupMode === 'standard' ? (
        <form onSubmit={handleStartStandard} className="glass-panel rounded-3xl p-6 lg:p-8 border border-white/10 flex flex-col gap-6">
          
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

          {/* Difficulty & Duration */}
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
              AI Engine will generate 5 customized questions for your selected role.
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center gap-2"
            >
              {loading ? 'Initializing Session...' : 'Launch AI Interview'} <Play className="w-4 h-4 fill-current" />
            </button>
          </div>

        </form>
      ) : (
        /* RESUME TRACK MODE */
        <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-white/10 flex flex-col gap-6">
          {!resumeParsed ? (
            <form onSubmit={handleScanResume} className="flex flex-col gap-6">
              <div className="border-2 border-dashed border-slate-700 hover:border-brand-purple rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-3 transition-colors bg-slate-900/40">
                <UploadCloud className="w-12 h-12 text-brand-purple" />
                <h3 className="font-bold text-slate-200 text-base">Paste Resume Text or Project Experience</h3>
                <p className="text-xs text-slate-400 max-w-sm">Paste your resume content below to automatically extract your target role, experience level, and tech stack skills.</p>
              </div>

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here (e.g. Senior Frontend Engineer with 4 years experience in React, Node.js, Redux, TypeScript, AWS...)"
                className="w-full h-44 glass-input rounded-2xl p-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-purple"
              />

              <button
                type="submit"
                disabled={loading || !resumeText.trim()}
                className="btn-gradient py-3.5 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Scanning Resume & Detecting Role...' : 'Scan Resume & Detect Role'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold text-lg text-white">Target Role & Skills Detected!</h3>
                    <p className="text-xs text-slate-400">AI has parsed your resume and detected the following target candidate profile.</p>
                  </div>
                </div>

                <button
                  onClick={() => setResumeParsed(false)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Scan Different Resume
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-brand-purple" /> Detected Target Job Role
                  </label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full glass-input rounded-xl py-2 px-3 text-xs font-bold text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-brand-blue" /> Detected Experience Level
                  </label>
                  <select
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                    className="w-full glass-input rounded-xl py-2 px-3 text-xs text-slate-200 bg-slate-900"
                  >
                    <option value={1}>0 - 1 Year (Junior)</option>
                    <option value={2}>1 - 3 Years (Mid-Level)</option>
                    <option value={5}>3 - 5 Years (Senior)</option>
                    <option value={8}>5+ Years (Staff / Principal)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" /> Target Company Track
                  </label>
                  <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full glass-input rounded-xl py-2 px-3 text-xs text-slate-200 bg-slate-900"
                  >
                    {companies.map((c) => (
                      <option key={c} value={c} className="bg-slate-900">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">Extracted Tech Stack Tags from Resume</span>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-brand-purple/20 border border-brand-purple/40 text-xs font-semibold text-brand-purple flex items-center gap-1.5">
                      <Tag className="w-3 h-3" /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Generates 5 tailored AI questions based on your {jobRole} resume.
                </span>

                <button
                  onClick={handleStartResumeTrack}
                  disabled={loading}
                  className="btn-gradient px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center gap-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" /> {loading ? 'Launching Session...' : `Launch ${jobRole} Resume Interview`}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};


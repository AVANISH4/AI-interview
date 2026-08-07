import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Sparkles, Award } from 'lucide-react';

export const CompanyInterviewsPage = () => {
  const navigate = useNavigate();

  const companies = [
    { id: 'google', name: 'Google', tagline: 'Organize the world information', logo: '🌐', roles: ['Frontend Specialist', 'System Design', 'Algorithms'], desc: 'Focuses heavily on algorithm efficiency, system architecture, and scalable design.' },
    { id: 'amazon', name: 'Amazon', tagline: 'Earth customer-centric company', logo: '📦', roles: ['Full Stack', 'Backend', 'Leadership Principles'], desc: 'Emphasizes Amazon Leadership Principles alongside technical coding proficiency.' },
    { id: 'microsoft', name: 'Microsoft', tagline: 'Empower every person', logo: '🪟', roles: ['C++', 'Azure Cloud', 'Software Engineer'], desc: 'Tests deep knowledge of data structures, OOP patterns, and Cloud architecture.' },
    { id: 'meta', name: 'Meta', tagline: 'Bring the world closer together', logo: '♾️', roles: ['React Frontend', 'Product Architecture'], desc: 'High-speed coding rounds with focus on React, GraphQL, and client-side performance.' },
    { id: 'netflix', name: 'Netflix', tagline: 'Entertain the world', logo: '🍿', roles: ['Microservices', 'DevOps', 'Senior Engineer'], desc: 'Focuses on high-throughput distributed systems and freedom & responsibility culture.' },
    { id: 'adobe', name: 'Adobe', tagline: 'Digital experiences', logo: '🎨', roles: ['C++', 'Frontend', 'Algorithms'], desc: 'Values graphics algorithms, performance engineering, and modern web UI.' },
    { id: 'apple', name: 'Apple', tagline: 'Think different', logo: '🍏', roles: ['Embedded', 'UI/UX Engineering', 'C++'], desc: 'Deep technical interviews with emphasis on privacy, optimization, and low-level code.' },
    { id: 'uber', name: 'Uber', tagline: 'Setting the world in motion', logo: '🚗', roles: ['Distributed Systems', 'Go/Java'], desc: 'Real-time geo-indexing, backend concurrency, and microservice resiliency.' },
    { id: 'linkedin', name: 'LinkedIn', tagline: 'Connect professionals', logo: '💼', roles: ['Java Backend', 'Frontend'], desc: 'Focuses on scalable REST APIs, domain modeling, and collaborative engineering.' },
    { id: 'openai', name: 'OpenAI', tagline: 'Benefit all humanity', logo: '🤖', roles: ['AI/ML Engineer', 'Python Infrastructure'], desc: 'Deep dive into LLM mechanics, Python data pipelines, and cutting-edge AI product design.' }
  ];

  const handleLaunchCompanyTrack = (comp) => {
    const interview = {
      _id: 'int_comp_' + comp.id,
      category: comp.roles[0] || 'Software Engineer',
      company: comp.name,
      jobRole: comp.roles[0],
      difficulty: 'Hard',
      questions: [
        { _id: 'qc1', questionText: `Welcome to the ${comp.name} Technical Round. How do you approach designing scalable systems for millions of concurrent requests?`, hint: 'Focus on load balancing, caching, and database partitioning.' },
        { _id: 'qc2', questionText: `Can you explain a key engineering tradeoff you had to make in your recent projects at scale?`, hint: 'Quantify latency vs consistency tradeoffs.' },
        { _id: 'qc3', questionText: `How do you optimize code quality and prevent memory leaks in production microservices?`, hint: 'Mention profiling, memory management, and code reviews.' }
      ]
    };
    navigate('/interview/room', { state: { interview } });
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-3">
          <Sparkles className="w-3.5 h-3.5" /> 10 Top Tech Company Modules
        </div>
        <h1 className="text-3xl font-extrabold text-white">Company-Specific Interview Tracks</h1>
        <p className="text-sm text-slate-400 mt-1">Practice interview rounds tailored for FAANG and top tier tech organizations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((comp) => (
          <div key={comp.id} className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between gap-6 hover:border-brand-purple/40 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl">
                  {comp.logo}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">{comp.name}</h3>
                  <p className="text-xs text-brand-purple">{comp.tagline}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-bold text-rose-300">
                Hard Round
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{comp.desc}</p>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Popular Roles</span>
              <div className="flex flex-wrap gap-1.5">
                {comp.roles.map((r, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 text-[11px] text-slate-300 border border-slate-800">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleLaunchCompanyTrack(comp)}
              className="btn-gradient w-full py-3 rounded-xl text-xs font-bold text-white shadow-glow-purple flex items-center justify-center gap-2"
            >
              Start {comp.name} Interview Round <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

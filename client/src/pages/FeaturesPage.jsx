import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Code2, FileText, Building2, BarChart3, Smartphone, 
  Cpu, Zap, ShieldCheck, CheckCircle2, Play, ArrowRight, Layers,
  Terminal, Award, Users, RefreshCw, Star, Globe, Lock
} from 'lucide-react';

export const FeaturesPage = () => {
  const featureCategories = [
    {
      title: 'AI Mock Interview & Voice Engine',
      description: 'Simulate realistic technical and behavioral interviews with real-time AI evaluation and feedback.',
      icon: Sparkles,
      color: 'from-brand-blue to-brand-purple',
      badge: 'Core Engine',
      features: [
        '18+ Specialized Interview Tracks (Frontend, Backend, MERN, System Design, HR, ML)',
        'Real-time response evaluation on technical accuracy, structure, and clarity',
        'Customizable difficulty levels (Easy, Medium, Hard) and interview durations',
        'STAR method behavioral evaluation framework with actionable suggestions'
      ]
    },
    {
      title: 'Monaco Code Lab & AST Complexity Evaluator',
      description: 'Full-featured online IDE with dynamic code AST evaluation and multi-language support.',
      icon: Code2,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Coding Environment',
      features: [
        'VS Code Monaco Editor integration with C++ 20, Java 17, Python 3, and JavaScript',
        'Top 150 LeetCode DSA challenge library with categories and approach hints',
        'Real-time AST Code Complexity Analyzer computing Time O(N) and Space O(1) bounds',
        'Remote cloud sandbox code execution with test case verification'
      ]
    },
    {
      title: 'AI Resume Scanner & Tailored Interview Track',
      description: 'Upload your resume to extract candidate role, experience level, and tech stack skills automatically.',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      badge: 'Smart Resume Parser',
      features: [
        'Auto-extracts target candidate role (e.g. Senior Frontend Engineer, DevOps Specialist)',
        'Pulls tech stack tags (React, Node.js, Docker, AWS, TypeScript, PyTorch)',
        'Generates 5 custom interview questions tailored specifically to your resume projects',
        'Editable role and skill parameters prior to interview launch'
      ]
    },
    {
      title: 'Company-Specific Interview Modules',
      description: 'Practice company-tailored interview tracks designed for FAANG and top tech companies.',
      icon: Building2,
      color: 'from-amber-500 to-orange-600',
      badge: 'FAANG Tracks',
      features: [
        'Google, Meta, Amazon, Microsoft, Netflix, Apple, Uber & OpenAI tracks',
        'Amazon Leadership Principles and Meta fast-paced React/system rounds',
        'Company-specific question banks and evaluation criteria',
        'Targeted technical probing based on enterprise hiring standards'
      ]
    },
    {
      title: 'Multi-Device 2-Person Local Connect',
      description: 'Seamlessly conduct sessions across 2 devices over local browser or Wi-Fi network.',
      icon: Smartphone,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Multi-Device Sync',
      features: [
        'Connect mobile phone or second laptop via local IP network link',
        'Real-time WebSocket/polling synchronization across 2 devices',
        'Live IDE code mirroring for candidate & interviewer mock sessions',
        'Zero setup required — works directly inside standard mobile web browsers'
      ]
    },
    {
      title: 'Radar Analytics & Comprehensive Reports',
      description: 'Detailed candidate scorecard, radar metric evaluation, and performance analytics.',
      icon: BarChart3,
      color: 'from-rose-500 to-purple-600',
      badge: 'Analytics Engine',
      features: [
        'Hexagonal radar metric breakdown (Communication, Technical Depth, Confidence, Grammar)',
        'Detailed strength/weakness synthesis with targeted improvement tips',
        'Question-by-question breakdown with expected keywords vs candidate transcript',
        'Historical analytics tracking score improvements over time'
      ]
    }
  ];

  const highlights = [
    { label: 'Interview Tracks', val: '18+', icon: Layers },
    { label: 'LeetCode Questions', val: '150+', icon: Terminal },
    { label: 'Target Companies', val: '10+', icon: Building2 },
    { label: 'Supported Languages', val: '4 IDE Specs', icon: Code2 },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 py-4">
      
      {/* Header Banner */}
      <div className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple">
          <Sparkles className="w-4 h-4 text-brand-purple" /> AI Interview Pro Platform Feature Stack
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Everything You Need to Ace Your <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink bg-clip-text text-transparent">Tech Interviews</span>
        </h1>
        
        <p className="text-base text-slate-300 leading-relaxed">
          From voice mock interviews and Monaco code execution to resume role extraction and multi-device connection, explore the full suite of AI-powered preparation tools.
        </p>

        <div className="flex items-center gap-4 pt-2">
          <Link
            to="/interview/setup"
            className="btn-gradient px-6 py-3 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center gap-2"
          >
            Start Free Practice Interview <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/coding"
            className="glass-card px-6 py-3 rounded-xl text-sm font-bold text-slate-200 hover:text-white border border-white/10 flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-emerald-400" /> Open Coding Lab
          </Link>
        </div>
      </div>

      {/* Metric Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-brand-purple" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white block">{stat.val}</span>
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Stack Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div 
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-brand-purple/40 transition-all group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-extrabold text-brand-purple uppercase tracking-wider">
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-purple transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5 pt-3 border-t border-slate-800">
                  {cat.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Footer Banner */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-brand-blue/20 via-purple-900/30 to-brand-purple/20 border border-brand-purple/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow-purple">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Ready to Boost Your Interview Confidence?</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl">
            Start practicing with AI voice questions, Monaco code challenges, and personalized radar score reports right now.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/register"
            className="btn-gradient px-6 py-3.5 rounded-xl text-xs font-bold text-white shadow-glow-purple flex items-center gap-2"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/companies"
            className="glass-card px-5 py-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white border border-white/10"
          >
            View Company Tracks
          </Link>
        </div>
      </div>

    </div>
  );
};

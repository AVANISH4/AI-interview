import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { 
  Sparkles, Play, Award, Zap, AlertTriangle, CheckCircle, 
  ArrowRight, BarChart3, Clock, ChevronRight, FileText 
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();

  const performanceData = [
    { date: 'Mon', score: 72 },
    { date: 'Tue', score: 78 },
    { date: 'Wed', score: 81 },
    { date: 'Thu', score: 85 },
    { date: 'Fri', score: 84 },
    { date: 'Sat', score: 89 },
    { date: 'Sun', score: 92 },
  ];

  const recentInterviews = [
    { id: 'int_101', title: 'React Frontend Senior Round', category: 'React', difficulty: 'Hard', company: 'Google', score: 88, date: '2 days ago' },
    { id: 'int_102', title: 'Full Stack MERN Technical', category: 'MERN', difficulty: 'Medium', company: 'Amazon', score: 82, date: '5 days ago' },
    { id: 'int_103', title: 'System Design Scaling', category: 'System Design', difficulty: 'Hard', company: 'Meta', score: 76, date: '1 week ago' },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-6 lg:p-8 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-purple/20 rounded-full blur-[80px] pointer-events-none" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-3">
            <Sparkles className="w-3.5 h-3.5" /> AI Interview Pro Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome Back, <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink bg-clip-text text-transparent">{user?.name}</span>! 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            You've completed <span className="text-slate-200 font-semibold">{user?.stats?.interviewsTaken || 8} interviews</span> this month with an average technical score of <span className="text-emerald-400 font-semibold">{user?.stats?.averageScore || 86}%</span>.
          </p>
        </div>

        <Link 
          to="/interview/setup" 
          className="btn-gradient px-6 py-3.5 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center gap-2 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" /> Start AI Voice Round
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Interviews Taken', val: user?.stats?.interviewsTaken || 8, icon: Play, color: 'text-brand-blue', bg: 'bg-brand-blue/10 border-brand-blue/20' },
          { label: 'Average Score', val: `${user?.stats?.averageScore || 86}%`, icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          { label: 'Questions Answered', val: user?.stats?.totalQuestionsAnswered || 40, icon: BarChart3, color: 'text-brand-purple', bg: 'bg-brand-purple/10 border-brand-purple/20' },
          { label: 'Coding Solved', val: user?.stats?.codingChallengesSolved || 14, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' }
        ].map((s, idx) => {
          const IconComp = s.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{s.label}</span>
                <div className={`p-2 rounded-xl border ${s.bg} ${s.color}`}>
                  <IconComp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-white mt-3">
                {s.val}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Performance Graph & Skill Breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Graph */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-lg text-white">Performance Progress</h3>
              <p className="text-xs text-slate-400">Weekly interview overall score trend</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              +14% Score Increase
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} domain={[50, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#scoreGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weak & Strong Skills */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Strong Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(user?.strongSkills || ['React Fiber & Hooks', 'REST API Architecture', 'JWT Authentication', 'Mongoose Pipelines']).map((sk, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">Weak Skills (Needs Practice)</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(user?.weakSkills || ['System Design Scalability', 'Kubernetes Pod Networking', 'Memory Leak Profiling']).map((sk, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <Link to="/interview/setup" className="glass-card text-center py-2.5 rounded-xl text-xs font-bold text-brand-purple hover:text-white border border-brand-purple/30">
            Target Weak Skills in Next Interview →
          </Link>
        </div>

      </div>

      {/* Recent Interviews */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-extrabold text-lg text-white">Recent AI Interviews</h3>
            <p className="text-xs text-slate-400">Review past reports, feedback, and radar scores</p>
          </div>
          <Link to="/analytics" className="text-xs text-brand-purple font-semibold hover:underline flex items-center gap-1">
            View All History <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {recentInterviews.map((int) => (
            <div key={int.id} className="glass-card rounded-2xl p-4 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center font-bold text-brand-purple text-sm border border-brand-purple/30">
                  {int.score}%
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{int.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>{int.company}</span>
                    <span>•</span>
                    <span className="text-brand-blue">{int.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {int.date}</span>
                  </div>
                </div>
              </div>

              <Link 
                to={`/report/${int.id}`} 
                className="px-4 py-2 rounded-xl glass-panel text-xs font-semibold text-slate-200 hover:text-white border border-white/10 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" /> View AI Report
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip 
} from 'recharts';
import { 
  Award, CheckCircle2, AlertTriangle, Lightbulb, 
  FileText, Download, Mail, Play, ArrowRight, Sparkles 
} from 'lucide-react';

export const EvaluationResultsPage = () => {
  const location = useLocation();
  const report = location.state?.report || {
    _id: 'rep_101',
    overallScore: 88,
    percentage: 88,
    metrics: {
      communication: 90,
      confidence: 85,
      technicalKnowledge: 92,
      problemSolving: 86,
      vocabulary: 84,
      grammar: 89
    },
    detailedFeedback: 'Exceptional performance during the AI mock interview session. You demonstrated clear structured reasoning, strong technical terminology, and confident voice delivery.',
    strengths: [
      'Articulate technical vocabulary and precise architectural definitions',
      'Solid explanation of asynchronous event loop microtasks',
      'Structured STAR format approach to scenario questions'
    ],
    weaknesses: [
      'Could elaborate further on edge-case lock contention strategies in distributed databases'
    ],
    suggestions: [
      'Quantify previous engineering achievements with business metrics',
      'Practice two-phase commit explanations for microservice transactions'
    ]
  };

  const radarData = [
    { subject: 'Communication', score: report.metrics?.communication || 90 },
    { subject: 'Confidence', score: report.metrics?.confidence || 85 },
    { subject: 'Technical', score: report.metrics?.technicalKnowledge || 92 },
    { subject: 'Problem Solving', score: report.metrics?.problemSolving || 86 },
    { subject: 'Vocabulary', score: report.metrics?.vocabulary || 84 },
    { subject: 'Grammar', score: report.metrics?.grammar || 89 },
  ];

  const barData = [
    { name: 'Comm', score: report.metrics?.communication || 90, benchmark: 75 },
    { name: 'Conf', score: report.metrics?.confidence || 85, benchmark: 78 },
    { name: 'Tech', score: report.metrics?.technicalKnowledge || 92, benchmark: 80 },
    { name: 'Problem', score: report.metrics?.problemSolving || 86, benchmark: 76 },
    { name: 'Vocab', score: report.metrics?.vocabulary || 84, benchmark: 72 },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      
      {/* Header Badge */}
      <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> AI Interview Evaluation Complete
          </div>
          <h1 className="text-3xl font-extrabold text-white">Interview Performance Results</h1>
          <p className="text-sm text-slate-400 mt-1">Detailed evaluation powered by AI Interview Pro Scoring Engine</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 px-6 py-4 rounded-2xl border border-white/10">
          <Award className="w-10 h-10 text-brand-purple" />
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Overall Score</span>
            <div className="text-3xl font-black text-emerald-400">{report.overallScore}%</div>
          </div>
        </div>
      </div>

      {/* Grid: Radar Chart & Bar Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Radar Chart */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col items-center">
          <h3 className="font-extrabold text-lg text-white mb-2">6-Point Radar Assessment</h3>
          <p className="text-xs text-slate-400 mb-4">Communication vs Technical Depth breakdown</p>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Candidate Score" dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Benchmark */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col items-center">
          <h3 className="font-extrabold text-lg text-white mb-2">Benchmark Score Comparison</h3>
          <p className="text-xs text-slate-400 mb-4">Your score vs Global Candidate Average</p>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', borderColor: '#334155' }} />
                <Bar dataKey="score" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Your Score" />
                <Bar dataKey="benchmark" fill="#334155" radius={[6, 6, 0, 0]} name="Global Avg" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Detailed Feedback & Recommendations */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Strengths */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">Key Strengths</h3>
          </div>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
            {report.strengths?.map((str, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                • {str}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">Areas for Improvement</h3>
          </div>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
            {report.weaknesses?.map((w, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-rose-500/20">
                • {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Suggestions */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">Suggestions</h3>
          </div>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
            {report.suggestions?.map((sug, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20">
                • {sug}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Action Footer */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to={`/report/${report._id}`} className="btn-gradient px-6 py-3 rounded-xl text-xs font-bold text-white shadow-glow-purple flex items-center gap-2">
            <FileText className="w-4 h-4" /> View PDF Report
          </Link>
        </div>

        <Link to="/interview/setup" className="glass-card px-6 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 border border-white/10">
          Start Another Session <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

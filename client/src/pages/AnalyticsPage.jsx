import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { BarChart3, Sparkles, TrendingUp } from 'lucide-react';

export const AnalyticsPage = () => {
  const scoreData = [
    { session: 'Round 1', score: 68 },
    { session: 'Round 2', score: 74 },
    { session: 'Round 3', score: 80 },
    { session: 'Round 4', score: 82 },
    { session: 'Round 5', score: 88 },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-3">
          <BarChart3 className="w-3.5 h-3.5" /> Performance Analytics Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white">Interview Progression Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Track your score improvements across sessions over time.</p>
      </div>

      <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
        <h3 className="font-extrabold text-lg text-white">Score Growth Curve</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={scoreData}>
              <XAxis dataKey="session" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} domain={[50, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', borderColor: '#334155' }} />
              <Area type="monotone" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

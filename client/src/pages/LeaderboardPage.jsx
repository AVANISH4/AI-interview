import React from 'react';
import { Trophy, Award, Sparkles, Flame, ShieldCheck } from 'lucide-react';

export const LeaderboardPage = () => {
  const leaders = [
    { rank: 1, name: 'Sarah Chen', score: 96, interviews: 24, badges: 8, points: 1250, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { rank: 2, name: 'Alex Johnson', score: 88, interviews: 14, badges: 6, points: 940, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
    { rank: 3, name: 'David Kim', score: 86, interviews: 18, badges: 5, points: 890, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80' },
    { rank: 4, name: 'Emily Davis', score: 84, interviews: 12, badges: 4, points: 760, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
    { rank: 5, name: 'Michael Brown', score: 82, interviews: 10, badges: 4, points: 680, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-3">
          <Trophy className="w-3.5 h-3.5 text-amber-400" /> Platform Global Rankings
        </div>
        <h1 className="text-3xl font-extrabold text-white">Community Leaderboard & Badges</h1>
        <p className="text-sm text-slate-400 mt-1">Compete with top engineers, earn points, and unlock achievements.</p>
      </div>

      <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Candidate</th>
                <th className="p-3">Avg Score</th>
                <th className="p-3">Interviews</th>
                <th className="p-3">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leaders.map((candidate) => (
                <tr key={candidate.rank} className="hover:bg-slate-900/40">
                  <td className="p-3 font-extrabold text-white">
                    {candidate.rank === 1 ? '🥇 #1' : candidate.rank === 2 ? '🥈 #2' : candidate.rank === 3 ? '🥉 #3' : `#${candidate.rank}`}
                  </td>
                  <td className="p-3 font-semibold text-white flex items-center gap-3">
                    <img src={candidate.avatar} alt={candidate.name} className="w-8 h-8 rounded-full object-cover border border-brand-purple" />
                    {candidate.name}
                  </td>
                  <td className="p-3 font-bold text-emerald-400">{candidate.score}%</td>
                  <td className="p-3">{candidate.interviews} rounds</td>
                  <td className="p-3 font-bold text-brand-purple">{candidate.points} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

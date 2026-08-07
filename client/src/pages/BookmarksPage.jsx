import React from 'react';
import { Bookmark, Sparkles, Trash2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookmarksPage = () => {
  const bookmarks = [
    { id: 'b1', text: 'How does the React Virtual DOM diffing algorithm handle list keys?', category: 'React' },
    { id: 'b2', text: 'Explain rate limiting algorithm implementations (Token Bucket vs Sliding Window).', category: 'Backend' },
    { id: 'b3', text: 'Compare MongoDB aggregation pipelines vs SQL GROUP BY queries.', category: 'Database' }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-3">
          <Bookmark className="w-3.5 h-3.5" /> Bookmarked Questions & Favorites
        </div>
        <h1 className="text-3xl font-extrabold text-white">Saved Interview Questions</h1>
        <p className="text-sm text-slate-400 mt-1">Review your saved technical questions for targeted revision before real interviews.</p>
      </div>

      <div className="flex flex-col gap-4">
        {bookmarks.map((b) => (
          <div key={b.id} className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-brand-purple uppercase tracking-wider">{b.category}</span>
              <p className="text-sm font-semibold text-white mt-1">"{b.text}"</p>
            </div>
            <Link to="/interview/setup" className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold text-white shrink-0 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" /> Practice
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

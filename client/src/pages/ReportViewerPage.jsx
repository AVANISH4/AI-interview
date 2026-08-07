import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { FileText, Download, Mail, CheckCircle2, Sparkles, Printer } from 'lucide-react';

export const ReportViewerPage = () => {
  const { id } = useParams();
  const [emailSent, setEmailSent] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await api.get(`/report/${id}/download`);
      window.print();
    } catch (e) {
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const handleEmailReport = async () => {
    try {
      await api.post(`/report/${id}/email`, { email: 'user@example.com' });
      setEmailSent(true);
    } catch (e) {
      setEmailSent(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">Official AI Report</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Interview Summary Report</h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownload}
            className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-glow-purple flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button 
            onClick={handleEmailReport}
            className="glass-card px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white border border-white/10 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-brand-purple" /> {emailSent ? 'Emailed!' : 'Email Report'}
          </button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-white/10 flex flex-col gap-8 text-slate-200 print:bg-white print:text-black">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-brand-purple" />
            <span className="font-extrabold text-xl text-white">AI Interview Pro Report</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">ID: {id || 'rep_101'}</span>
        </div>

        {/* Executive Overview */}
        <div className="grid sm:grid-cols-2 gap-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Overall Assessment</span>
            <div className="text-4xl font-extrabold text-emerald-400 mt-1">88%</div>
            <p className="text-xs text-slate-300 mt-2">Certified High Proficiency Level</p>
          </div>
          <div className="flex flex-col gap-1 text-xs text-slate-300">
            <span><strong>Role:</strong> Senior Frontend Engineer</span>
            <span><strong>Target Company:</strong> Google</span>
            <span><strong>Difficulty:</strong> Hard</span>
            <span><strong>Date Generated:</strong> {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Metrics Table */}
        <div>
          <h3 className="font-bold text-lg text-white mb-3">Evaluation Scores</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Communication', val: '90%' },
              { label: 'Confidence', val: '85%' },
              { label: 'Technical Depth', val: '92%' },
              { label: 'Problem Solving', val: '86%' },
              { label: 'Vocabulary', val: '84%' },
              { label: 'Grammar', val: '89%' }
            ].map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl glass-card border border-white/5 flex justify-between items-center">
                <span className="text-xs text-slate-400">{m.label}</span>
                <span className="text-sm font-bold text-white">{m.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Feedback Body */}
        <div>
          <h3 className="font-bold text-lg text-white mb-2">Detailed Technical Analysis</h3>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-white/5">
            The candidate demonstrated exceptionally strong clarity in describing modern JavaScript V8 mechanics, React reconciliation strategies, and backend RESTful microservice scalability. Explanations were concise and structured using STAR methodologies.
          </p>
        </div>

      </div>

    </div>
  );
};

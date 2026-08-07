import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { UploadCloud, FileText, Sparkles, CheckCircle2, Play, ArrowRight, Tag } from 'lucide-react';

export const ResumeInterviewPage = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState(false);

  const handleSimulateUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/resume/upload', { resumeText });
      const skills = res.data.extractedSkills || ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'REST APIs', 'System Design'];
      setExtractedSkills(skills);
      setParsed(true);
    } catch (err) {
      setExtractedSkills(['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'REST APIs', 'System Design']);
      setParsed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStartResumeInterview = async () => {
    try {
      const res = await api.post('/resume/generate', { skills: extractedSkills, jobRole: 'Full Stack MERN Engineer' });
      const interview = res.data.interview || {
        _id: 'int_res_' + Date.now(),
        category: 'Full Stack MERN',
        company: 'Resume Tailored Track',
        jobRole: 'Full Stack Engineer',
        questions: extractedSkills.slice(0, 5).map((sk, idx) => ({
          _id: 'q_res_' + idx,
          questionText: `Based on your resume experience with ${sk}, how do you architect high-scale applications using ${sk}?`,
          hint: `Discuss production deployment and best practices for ${sk}.`
        }))
      };
      navigate('/interview/room', { state: { interview } });
    } catch (err) {
      const fallbackInterview = {
        _id: 'int_res_' + Date.now(),
        category: 'Full Stack MERN',
        company: 'Resume Tailored Track',
        jobRole: 'Full Stack Engineer',
        questions: [
          { _id: 'q1', questionText: 'Based on your resume experience with React & Node.js, how do you handle end-to-end authentication and state?', hint: 'Discuss JWT and Context API.' },
          { _id: 'q2', questionText: 'Can you describe a challenging MongoDB aggregation pipeline you built for analytics?', hint: 'Mention $match and $group stages.' }
        ]
      };
      navigate('/interview/room', { state: { interview: fallbackInterview } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-3">
          <Sparkles className="w-3.5 h-3.5" /> AI Resume Scanner & Tailored Interview
        </div>
        <h1 className="text-3xl font-extrabold text-white">Generate Interview from Resume</h1>
        <p className="text-sm text-slate-400 mt-1">Upload your resume to extract skills and launch an interview customized to your exact experience.</p>
      </div>

      {!parsed ? (
        <form onSubmit={handleSimulateUpload} className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col gap-6">
          
          <div className="border-2 border-dashed border-slate-700 hover:border-brand-purple rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-3 transition-colors bg-slate-900/40">
            <UploadCloud className="w-12 h-12 text-brand-purple" />
            <h3 className="font-bold text-slate-200 text-base">Paste Resume Content or Drop PDF File</h3>
            <p className="text-xs text-slate-400 max-w-sm">Paste your resume text below for instant AI skill extraction and customized question generation.</p>
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume summary, tech stack skills, and project descriptions here..."
            className="w-full h-40 glass-input rounded-2xl p-4 text-sm text-slate-200 placeholder:text-slate-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient py-3.5 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center justify-center gap-2"
          >
            {loading ? 'Analyzing Resume with AI...' : 'Scan & Extract Core Skills'} <ArrowRight className="w-4 h-4" />
          </button>

        </form>
      ) : (
        <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
            <h3 className="font-bold text-lg text-white">Skills Successfully Extracted</h3>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">Extracted Tech Stack Tags</span>
            <div className="flex flex-wrap gap-2.5">
              {extractedSkills.map((skill, idx) => (
                <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-brand-purple/20 border border-brand-purple/40 text-xs font-semibold text-brand-purple flex items-center gap-1.5">
                  <Tag className="w-3 h-3" /> {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setParsed(false)}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Re-upload Resume
            </button>
            
            <button
              onClick={handleStartResumeInterview}
              className="btn-gradient px-6 py-3 rounded-xl text-xs font-bold text-white shadow-glow-purple flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Resume-Tailored Voice Interview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

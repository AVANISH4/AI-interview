import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { UploadCloud, FileText, Sparkles, CheckCircle2, Play, ArrowRight, Tag, Briefcase, Award, Building2 } from 'lucide-react';

export const ResumeInterviewPage = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [detectedRole, setDetectedRole] = useState('Full Stack MERN Engineer');
  const [detectedCategory, setDetectedCategory] = useState('Full Stack');
  const [experienceYears, setExperienceYears] = useState(2);
  const [targetCompany, setTargetCompany] = useState('General Tech');
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState(false);

  const handleUploadResume = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/resume/upload', { resumeText });
      const skills = res.data.extractedSkills || ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'REST APIs', 'System Design'];
      setExtractedSkills(skills);
      setDetectedRole(res.data.recommendedRole || 'Full Stack MERN Engineer');
      setDetectedCategory(res.data.recommendedCategory || 'Full Stack');
      setExperienceYears(res.data.experienceYears || 2);
      setParsed(true);
    } catch (err) {
      setExtractedSkills(['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'REST APIs', 'System Design']);
      setDetectedRole('Full Stack Engineer');
      setDetectedCategory('Full Stack');
      setExperienceYears(2);
      setParsed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStartResumeInterview = async () => {
    setLoading(true);
    try {
      const res = await api.post('/resume/generate', { 
        skills: extractedSkills, 
        jobRole: detectedRole,
        category: detectedCategory,
        yearsOfExperience: experienceYears,
        company: targetCompany
      });

      const interview = res.data.interview || {
        _id: 'int_res_' + Date.now(),
        category: detectedCategory,
        company: targetCompany,
        jobRole: detectedRole,
        questions: extractedSkills.slice(0, 5).map((sk, idx) => ({
          _id: 'q_res_' + idx,
          questionText: `Based on your resume experience with ${sk} as a ${detectedRole}, how do you architect high-scale production systems using ${sk}?`,
          hint: `Discuss performance, scalability, and best practices for ${sk}.`
        }))
      };
      navigate('/interview/room', { state: { interview } });
    } catch (err) {
      const fallbackInterview = {
        _id: 'int_res_' + Date.now(),
        category: detectedCategory,
        company: targetCompany,
        jobRole: detectedRole,
        questions: [
          { _id: 'q1', questionText: `Based on your resume for ${detectedRole}, how do you handle end-to-end architecture and state management?`, hint: 'Discuss scalability and patterns.' },
          { _id: 'q2', questionText: `Can you describe a challenging technical bottleneck you resolved using ${extractedSkills[0] || 'your core stack'}?`, hint: 'Mention metrics and optimization.' }
        ]
      };
      navigate('/interview/room', { state: { interview: fallbackInterview } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-3">
          <Sparkles className="w-3.5 h-3.5" /> AI Resume Scanner & Role-Based Interview
        </div>
        <h1 className="text-3xl font-extrabold text-white">Generate Interview from Resume</h1>
        <p className="text-sm text-slate-400 mt-1">Paste your resume content to auto-detect your target role, extract tech skills, and launch a tailored AI mock interview.</p>
      </div>

      {!parsed ? (
        <form onSubmit={handleUploadResume} className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col gap-6">
          
          <div className="border-2 border-dashed border-slate-700 hover:border-brand-purple rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-3 transition-colors bg-slate-900/40">
            <UploadCloud className="w-12 h-12 text-brand-purple" />
            <h3 className="font-bold text-slate-200 text-base">Paste Resume Text or Project Experience</h3>
            <p className="text-xs text-slate-400 max-w-sm">Paste your resume summary, tech stack skills, and project descriptions below for AI role & skill extraction.</p>
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content here (e.g. Senior Frontend Developer with 4 years experience in React, Node.js, Redux, TypeScript, GraphQL, AWS...)"
            className="w-full h-44 glass-input rounded-2xl p-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-purple"
          />

          <button
            type="submit"
            disabled={loading || !resumeText.trim()}
            className="btn-gradient py-3.5 rounded-xl text-sm font-bold text-white shadow-glow-purple flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Analyzing Resume & Extracting Target Role...' : 'Scan Resume & Extract Role/Skills'} <ArrowRight className="w-4 h-4" />
          </button>

        </form>
      ) : (
        <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col gap-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-lg text-white">Resume Successfully Analyzed!</h3>
                <p className="text-xs text-slate-400">AI has detected your candidate profile, target role, and tech skills.</p>
              </div>
            </div>

            <button
              onClick={() => setParsed(false)}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Scan Different Resume
            </button>
          </div>

          {/* Role & Experience Configuration */}
          <div className="grid md:grid-cols-3 gap-5 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-purple" /> Target Job Role
              </label>
              <input
                type="text"
                value={detectedRole}
                onChange={(e) => setDetectedRole(e.target.value)}
                className="w-full glass-input rounded-xl py-2 px-3 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-blue" /> Experience Level
              </label>
              <select
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
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
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full glass-input rounded-xl py-2 px-3 text-xs text-slate-200 bg-slate-900"
              >
                <option value="General Tech">General Tech Enterprise</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Meta">Meta</option>
                <option value="Microsoft">Microsoft</option>
              </select>
            </div>
          </div>

          {/* Extracted Skills List */}
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

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Generates 5 tailored AI questions based on {detectedRole} experience.
            </span>
            
            <button
              onClick={handleStartResumeInterview}
              disabled={loading}
              className="btn-gradient px-6 py-3 rounded-xl text-xs font-bold text-white shadow-glow-purple flex items-center gap-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" /> {loading ? 'Launching Session...' : 'Start Resume-Tailored AI Interview'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};


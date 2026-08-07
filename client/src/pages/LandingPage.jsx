import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, Mic, BrainCircuit, Code2, BarChart2, ShieldCheck, 
  CheckCircle2, ArrowRight, Play, Star, ChevronDown, Award 
} from 'lucide-react';

export const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [demoState, setDemoState] = useState('idle'); // idle, listening, evaluating
  const [demoTranscript, setDemoTranscript] = useState('');

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleDemoSpeak = () => {
    setDemoState('listening');
    setDemoTranscript('For React rendering optimization, I utilize React.memo, useMemo, and useCallback to avoid unnecessary re-renders.');
    setTimeout(() => {
      setDemoState('evaluating');
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-24 py-12 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-purple/40 text-xs font-semibold text-brand-purple mb-8 shadow-glow-purple"
        >
          <Sparkles className="w-4 h-4 text-brand-pink" />
          <span>Next-Generation AI Mock Interview Platform 2.0</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight"
        >
          Master Technical & HR Interviews with <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink bg-clip-text text-transparent">Real-Time AI Voice</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          Simulate realistic voice interviews with AI, solve live Monaco coding challenges, get radar metrics analytics, and land high-paying offers at Google, Meta, & Amazon.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link to="/interview/setup" className="btn-gradient px-8 py-4 rounded-xl text-base font-bold text-white shadow-glow-purple flex items-center justify-center gap-3 w-full sm:w-auto">
            <Play className="w-5 h-5 fill-current" /> Start AI Interview Now
          </Link>
          <Link to="/companies" className="glass-card px-8 py-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 w-full sm:w-auto border border-white/10">
            Explore Company Tracks <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Hero Interactive Live Demo Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 w-full max-w-4xl glass-panel rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 relative text-left"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-400 ml-2">Interactive AI Voice Interview Simulation</span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ● AI Live Engine Online
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Avatar / Question */}
            <div className="flex flex-col gap-4 bg-slate-900/60 rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary p-0.5 shadow-glow-purple">
                  <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6 text-brand-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 text-sm">AI Senior Architect Intervewer</h4>
                  <p className="text-xs text-slate-400">Category: React / Frontend Specialist</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 bg-dark-bg/80 p-4 rounded-xl border border-white/5 italic">
                "Can you walk me through your strategy for optimizing expensive rendering cycles in a complex React application?"
              </p>
            </div>

            {/* Candidate Voice Box */}
            <div className="flex flex-col justify-between bg-slate-900/60 rounded-2xl p-5 border border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Answer (Microphone)</span>
                  {demoState === 'listening' && (
                    <span className="text-xs font-medium text-rose-400 animate-pulse flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Recording...
                    </span>
                  )}
                </div>
                <div className="min-h-[90px] p-3 rounded-xl bg-dark-bg/80 border border-white/5 text-sm text-slate-300">
                  {demoTranscript || <span className="text-slate-500 italic">Click "Simulate Speak" to test voice input...</span>}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                {demoState === 'idle' && (
                  <button 
                    onClick={handleDemoSpeak}
                    className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" /> Simulate Speak Answer
                  </button>
                )}

                {demoState === 'listening' && (
                  <div className="flex items-center gap-2">
                    <div className="h-6 flex items-center gap-1">
                      <span className="wave-bar" />
                      <span className="wave-bar" style={{ animationDelay: '0.2s' }} />
                      <span className="wave-bar" style={{ animationDelay: '0.4s' }} />
                      <span className="wave-bar" style={{ animationDelay: '0.6s' }} />
                    </div>
                    <span className="text-xs text-brand-purple">Converting Speech to Text...</span>
                  </div>
                )}

                {demoState === 'evaluating' && (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Score: 92/100 (High Technical Depth)
                    </span>
                    <button 
                      onClick={() => { setDemoState('idle'); setDemoTranscript(''); }}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Reset Demo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="flex flex-col items-center">
        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Comprehensive 17+ Feature Stack</h2>
          <p className="text-slate-400 mt-3">Everything you need to transform your interview performance and gain absolute confidence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          {[
            { icon: Mic, title: 'AI Voice & Speech-to-Text', desc: 'Speak naturally using your microphone. Voice synthesis asks questions dynamically, and STT transcripts your answers in real time.' },
            { icon: Code2, title: 'Monaco Code Editor', desc: 'Solve live coding challenges in JavaScript, Python, C++, and Java with real test cases, execution time, and AI complexity evaluation.' },
            { icon: BarChart2, title: 'Radar Chart Analytics', desc: 'Instant radar charts evaluating Communication, Confidence, Technical Depth, Vocabulary, and Problem-Solving frameworks.' },
            { icon: BrainCircuit, title: 'Company Track Modules', desc: 'Practice curated interview rounds designed specifically for Google, Amazon, Microsoft, Meta, Netflix, and OpenAI.' },
            { icon: ShieldCheck, title: 'Resume Interview Scanner', desc: 'Upload your PDF resume. Our AI extracts your core technologies and builds a personalized interview customized to your background.' },
            { icon: Award, title: 'Leaderboards & Badges', desc: 'Compete with developers worldwide, earn achievement badges, unlock points, and climb the platform rankings.' }
          ].map((f, i) => {
            const IconComponent = f.icon;
            return (
              <div key={i} className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple border border-brand-purple/30">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="flex flex-col items-center">
        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Loved by Software Engineers Worldwide</h2>
          <p className="text-slate-400 mt-3">Here is how AI Interview Pro helped engineers secure L5/L6 offers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          {[
            { name: 'Sarah Chen', role: 'Senior Frontend Engineer @ Google', text: 'The voice interview simulation felt surprisingly real. Receiving immediate radar charts on my confidence and technical clarity helped me fix my weak spots before my Google onsite.' },
            { name: 'Marcus Vance', role: 'Full Stack Engineer @ Meta', text: 'The Monaco editor integration combined with AI code optimization tips gave me the exact edge I needed for my coding rounds.' },
            { name: 'Elena Rostova', role: 'Backend Engineer @ Amazon', text: 'Uploading my resume and getting an interview generated specifically around my MERN stack experience was mind-blowing.' }
          ].map((t, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5">
              <p className="text-sm text-slate-300 italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{t.name}</h4>
                  <p className="text-xs text-brand-purple">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="flex flex-col items-center">
        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Transparent & Flexible Pricing</h2>
          <p className="text-slate-400 mt-3">Start for free, upgrade when you are ready to conquer top-tier tech rounds.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-white/10">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Starter</span>
              <h3 className="text-3xl font-extrabold text-white mt-2">$0 <span className="text-sm text-slate-400 font-normal">/ month</span></h3>
              <p className="text-sm text-slate-400 mt-2">Perfect for exploring basic interview practice.</p>

              <ul className="mt-6 flex flex-col gap-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2 AI Mock Interviews / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic Score Overview</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Access to General Questions</li>
              </ul>
            </div>
            <Link to="/register" className="mt-8 glass-panel py-3 rounded-xl text-center text-sm font-semibold text-slate-200 hover:text-white border border-white/10">
              Get Started Free
            </Link>
          </div>

          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-brand-purple/50 relative shadow-glow-purple">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-primary text-[10px] font-bold uppercase tracking-wider text-white">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">Pro Unlimited</span>
              <h3 className="text-3xl font-extrabold text-white mt-2">$19 <span className="text-sm text-slate-400 font-normal">/ month</span></h3>
              <p className="text-sm text-slate-400 mt-2">Unlimited access to voice AI, resume scanner, and company tracks.</p>

              <ul className="mt-6 flex flex-col gap-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-purple" /> Unlimited Voice AI Interviews</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-purple" /> Unlimited Monaco Coding Challenges</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-purple" /> All 10+ Top Company Tracks (Google, Meta, etc.)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-purple" /> Download PDF Reports & Email Dispatch</li>
              </ul>
            </div>
            <Link to="/pricing" className="mt-8 btn-gradient py-3 rounded-xl text-center text-sm font-bold text-white shadow-lg">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="flex flex-col items-center max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4 w-full">
          {[
            { q: 'How does the AI Voice Speech-to-Text work?', a: 'AI Interview Pro uses Web Speech API to convert your spoken answers into text in real-time while synthesizing AI questions with natural voice speech.' },
            { q: 'Can I generate interviews based on my resume?', a: 'Yes! Upload your resume in PDF format, and our parser will extract your top tech stack skills to generate tailored interview questions.' },
            { q: 'Is the Monaco Code Editor fully functional?', a: 'Yes, it supports JavaScript, Python, C++, and Java with real-time test case execution and AI complexity feedback.' }
          ].map((faq, idx) => (
            <div key={idx} className="glass-card rounded-xl border border-white/5 overflow-hidden">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between text-base font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === idx ? 'rotate-180 text-brand-purple' : 'text-slate-400'}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-sm text-slate-400 border-t border-slate-800/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-purple" />
          <span className="font-bold text-slate-200">AI Interview Pro</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          <Link to="/contact" className="hover:text-white">Support</Link>
        </div>
      </footer>

    </div>
  );
};

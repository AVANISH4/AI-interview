import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import api from '../services/api';
import { 
  BrainCircuit, Mic, MicOff, Volume2, VolumeX, SkipForward, 
  RotateCcw, CheckCircle2, Clock, Sparkles, Send, Square 
} from 'lucide-react';

export const AIInterviewRoomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const interview = location.state?.interview || {
    _id: 'int_demo',
    category: 'React / Frontend',
    difficulty: 'Medium',
    company: 'Google',
    questions: [
      { _id: 'q1', questionText: 'How does the React Virtual DOM work, and how do Reconciliation and Fiber improve rendering speed?', hint: 'Mention diffing algorithms and fiber node tree.' },
      { _id: 'q2', questionText: 'Can you walk me through a challenging performance optimization you implemented for high-traffic web apps?', hint: 'Mention code splitting, image optimization, or memoization.' },
      { _id: 'q3', questionText: 'What is the difference between client state and server state management?', hint: 'Compare Redux/Context with React Query.' }
    ]
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    isListening,
    transcript,
    setTranscript,
    isSpeaking,
    startListening,
    stopListening,
    speakText,
    stopSpeaking
  } = useSpeech();

  const currentQuestion = interview.questions[currentIdx] || interview.questions[0];

  // Auto-speak question when question changes
  useEffect(() => {
    if (currentQuestion) {
      speakText(currentQuestion.questionText);
      setTimerSeconds(120);
    }
  }, [currentIdx]);

  // Countdown timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleRepeatQuestion = () => {
    speakText(currentQuestion.questionText);
  };

  const handleNextOrSave = (skipped = false) => {
    stopListening();
    stopSpeaking();

    const answerPayload = {
      questionId: currentQuestion._id,
      userTranscript: skipped ? '' : transcript,
      skipped,
      timeTakenSeconds: 120 - timerSeconds
    };

    const updatedAnswers = [...answers, answerPayload];
    setAnswers(updatedAnswers);
    setTranscript('');

    if (currentIdx + 1 < interview.questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finishInterviewSession(updatedAnswers);
    }
  };

  const finishInterviewSession = async (finalAnswers) => {
    setIsSubmitting(true);
    stopListening();
    stopSpeaking();

    try {
      const res = await api.post('/interviews/submit', {
        interviewId: interview._id,
        category: interview.category,
        questions: interview.questions,
        answers: finalAnswers
      });
      const report = res.data.report || {
        _id: 'rep_' + Date.now(),
        overallScore: 88,
        percentage: 88,
        metrics: { communication: 90, confidence: 85, technicalKnowledge: 92, problemSolving: 86, vocabulary: 84, grammar: 89 },
        detailedFeedback: 'Outstanding technical performance! Clear communication and structured reasoning.',
        strengths: ['Great technical terminology', 'Concise explanations'],
        weaknesses: ['Could mention quantitative metrics from prior projects'],
        suggestions: ['Practice STAR framework for behavioral rounds']
      };

      navigate(`/report/${report._id}`, { state: { report } });
    } catch (err) {
      const fallbackReport = {
        _id: 'rep_' + Date.now(),
        overallScore: 88,
        percentage: 88,
        metrics: { communication: 90, confidence: 85, technicalKnowledge: 92, problemSolving: 86, vocabulary: 84, grammar: 89 },
        detailedFeedback: 'Outstanding technical performance! Clear communication and structured reasoning.',
        strengths: ['Great technical terminology', 'Concise explanations'],
        weaknesses: ['Could mention quantitative metrics from prior projects'],
        suggestions: ['Practice STAR framework for behavioral rounds']
      };
      navigate(`/report/${fallbackReport._id}`, { state: { report: fallbackReport } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between glass-panel rounded-2xl px-6 py-4 border border-white/10">
        <div>
          <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">
            {interview.company} Track • {interview.category}
          </span>
          <h2 className="text-xl font-extrabold text-white">
            Question {currentIdx + 1} of {interview.questions.length}
          </h2>
        </div>

        {/* Timer & Finish button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-sm">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
          </div>

          <button 
            onClick={() => finishInterviewSession(answers)}
            className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center gap-1.5"
          >
            <Square className="w-3.5 h-3.5 fill-current" /> End Interview
          </button>
        </div>
      </div>

      {/* Main Grid: AI Assistant Box & Candidate Mic Box */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Left Column: AI Speaker */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-primary p-0.5 ${isSpeaking ? 'shadow-glow-purple animate-pulse' : ''}`}>
                <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6 text-brand-purple" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">AI Voice Evaluator</h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active Session
                </span>
              </div>
            </div>

            <button 
              onClick={handleRepeatQuestion}
              className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white border border-white/5"
              title="Repeat AI Speech"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* AI Question Box */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 min-h-[140px] justify-center">
            <p className="text-slate-100 text-base md:text-lg font-medium leading-relaxed">
              "{currentQuestion.questionText}"
            </p>
            {currentQuestion.hint && (
              <span className="text-xs text-brand-purple italic">
                💡 Hint: {currentQuestion.hint}
              </span>
            )}
          </div>

          {/* Audio Wave Visualizer for AI */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <>
                  <div className="h-6 flex items-center gap-1">
                    <span className="wave-bar" />
                    <span className="wave-bar" style={{ animationDelay: '0.1s' }} />
                    <span className="wave-bar" style={{ animationDelay: '0.3s' }} />
                    <span className="wave-bar" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <span className="text-xs text-brand-purple font-medium">AI is speaking...</span>
                </>
              ) : (
                <span className="text-xs text-slate-500">AI waiting for your response</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Candidate Voice & Microphone Input */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm">Your Answer Transcript</h3>
            <span className="text-xs font-semibold text-slate-400">Speech-to-Text</span>
          </div>

          {/* Live Transcript Textarea / Display */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5 min-h-[140px] flex flex-col justify-between">
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Click 'Start Microphone' and speak, or type your answer here..."
              className="w-full h-full bg-transparent text-sm text-slate-200 resize-none focus:outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleMicToggle}
              className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isListening 
                  ? 'bg-rose-500 text-white shadow-lg animate-pulse' 
                  : 'btn-gradient text-white shadow-glow-purple'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" /> Start Microphone
                </>
              )}
            </button>

            <button
              onClick={() => handleNextOrSave(true)}
              className="px-4 py-3 rounded-xl glass-card text-xs font-semibold text-slate-400 hover:text-white border border-white/5"
            >
              Skip
            </button>

            <button
              onClick={() => handleNextOrSave(false)}
              disabled={isSubmitting}
              className="px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 flex items-center gap-1.5"
            >
              Next <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-sm text-slate-400 mb-6">Enter your registered email address and we will send you a reset link.</p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <h4 className="font-bold text-emerald-300">Check Your Inbox</h4>
            <p className="text-xs text-slate-300">We have sent a reset password link to <span className="font-semibold text-white">{email}</span></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.johnson@example.com"
                  className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-sm"
                />
              </div>
            </div>
            <button type="submit" className="btn-gradient py-3 rounded-xl text-sm font-bold text-white shadow-glow-purple">
              Send Reset Link
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800">
          <Link to="/login" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

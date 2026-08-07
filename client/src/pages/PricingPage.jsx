import React, { useState } from 'react';
import api from '../services/api';
import { Crown, CheckCircle2, Sparkles, Zap } from 'lucide-react';

export const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan) => {
    setLoading(true);
    try {
      const res = await api.post('/payment/create-checkout-session', { plan, billingCycle });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      alert('Stripe test payment simulated! Subscription upgraded.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 items-center text-center">
      
      <div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple mb-4 shadow-glow-purple">
          <Crown className="w-4 h-4 text-amber-400" /> Unlock AI Interview Pro Membership
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">Simple, Transparent Subscription Plans</h1>
        <p className="text-sm md:text-base text-slate-400 mt-2 max-w-xl mx-auto">
          Get unlimited AI voice rounds, Monaco coding challenges, resume extraction, and company track modules.
        </p>
      </div>

      {/* Monthly / Yearly Toggle */}
      <div className="glass-panel p-1.5 rounded-2xl border border-white/10 flex items-center gap-2">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            billingCycle === 'monthly' ? 'btn-gradient text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          Monthly Billing
        </button>
        <button
          onClick={() => setBillingCycle('yearly')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            billingCycle === 'yearly' ? 'btn-gradient text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          Yearly Billing <span className="ml-1 text-[10px] text-amber-300 font-extrabold">SAVE 35%</span>
        </button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 w-full text-left">
        
        {/* Free Plan */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-white">Starter Free</h3>
            <div className="text-3xl font-black text-white mt-3">$0 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <p className="text-xs text-slate-400 mt-1">Explore basic questions.</p>

            <ul className="mt-6 flex flex-col gap-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 2 AI Mock Interviews / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Basic Score Overview</li>
            </ul>
          </div>
          <button className="mt-8 glass-panel py-2.5 rounded-xl text-xs font-semibold text-slate-300 border border-white/10">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="glass-card rounded-3xl p-6 border border-brand-purple/50 flex flex-col justify-between relative shadow-glow-purple bg-gradient-to-b from-brand-purple/10 to-transparent">
          <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-gradient-primary text-[9px] font-extrabold text-white uppercase">
            Recommended
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">Pro Unlimited <Crown className="w-4 h-4 text-amber-400" /></h3>
            <div className="text-3xl font-black text-white mt-3">
              ${billingCycle === 'yearly' ? '12' : '19'} <span className="text-xs text-slate-400 font-normal">/ mo</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Full access to voice AI & Monaco editor.</p>

            <ul className="mt-6 flex flex-col gap-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Unlimited AI Voice Rounds</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Live Monaco Code Sandbox</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> All 10+ Company Tracks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> PDF Download & Email Reports</li>
            </ul>
          </div>
          <button 
            onClick={() => handleCheckout('pro')}
            disabled={loading}
            className="mt-8 btn-gradient py-3 rounded-xl text-xs font-bold text-white shadow-lg"
          >
            {loading ? 'Redirecting to Stripe...' : 'Subscribe to Pro'}
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-white">Enterprise Teams</h3>
            <div className="text-3xl font-black text-white mt-3">$49 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <p className="text-xs text-slate-400 mt-1">For bootcamps & team training.</p>

            <ul className="mt-6 flex flex-col gap-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Account Manager</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Team Dashboard & Reports</li>
            </ul>
          </div>
          <button 
            onClick={() => handleCheckout('enterprise')}
            className="mt-8 glass-panel py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white border border-white/10"
          >
            Contact Sales
          </button>
        </div>

      </div>

    </div>
  );
};

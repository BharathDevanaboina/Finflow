
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const LandingPage: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) login(email);
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-orange/30 font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange to-white/20 rounded-lg"></div>
            <span className="text-xl font-bold tracking-tight font-serif italic">FinFlow</span>
          </div>
          <Button size="sm" variant="ghost" onClick={() => login('demo@finflow.app')}>Enter Demo</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-4xl mx-auto animate-fade-in">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-orange mb-8">
            The Future of Financial Deciding
          </span>
          <h1 className="text-5xl md:text-8xl font-serif italic font-bold mb-8 leading-[1.1] tracking-tight">
            Know what happens next, <br />
            <span className="text-white opacity-40">before you spend.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Stop tracking the past. FinFlow maps the 90-day impact of every decision—from a new phone to a shared EMI—so you can spend without the "will-I-regret-this" feeling.
          </p>
          
          <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-20">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-orange/50 transition text-white placeholder:text-gray-600 shadow-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button size="lg" type="submit" className="bg-orange text-black hover:bg-white px-10">Get Early Access</Button>
          </form>
        </div>

        {/* Mockup Preview */}
        <div className="relative max-w-4xl mx-auto animate-slide-up px-4">
           <div className="relative z-10 rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10]">
             <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange/20 flex items-center justify-center text-orange mb-6 text-3xl">🤖</div>
                <h3 className="text-2xl font-serif italic mb-2">"Should I buy the iPhone 15 on EMI?"</h3>
                <p className="text-gray-500 max-w-sm text-sm">FinFlow is calculating your 30/60/90 day impact, trade-offs with your Japan Trip goal, and credit utilization shift...</p>
                <div className="mt-10 flex gap-4 opacity-20 scale-90">
                    <div className="w-32 h-48 bg-white/10 rounded-2xl border border-white/10"></div>
                    <div className="w-32 h-48 bg-orange/10 rounded-2xl border border-orange/10"></div>
                    <div className="w-32 h-48 bg-white/10 rounded-2xl border border-white/10"></div>
                </div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
           </div>
        </div>
      </section>

      {/* The Pain Point (Emotional Truth) */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold leading-tight">
              Tracking money doesn't stop impulse buys. <br />
              <span className="text-orange">Clarity does.</span>
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                Most apps show you a post-mortem of your mistakes. They tell you where your money went <strong>after</strong> it left your account. That’s like a car that only shows you the crash report.
              </p>
              <p>
                FinFlow is different. It’s a decision-support tool. It sits at the exact moment you’re about to spend, showing you the future so you can decide with confidence, not discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features (Decision Focused) */}
      <section className="py-32 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-orange uppercase tracking-[0.5em] mb-4">How it works</h2>
            <p className="text-4xl font-serif italic">Decide better, in seconds.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: '30/60/90 Day Projections', 
                desc: 'See exactly how this purchase affects your next three months of cashflow.', 
                icon: '⏳' 
              },
              { 
                title: 'Explicit Trade-offs', 
                desc: '“Buying this now delays your Home Downpayment goal by 14 days.” Clear, simple logic.', 
                icon: '⚖️' 
              },
              { 
                title: 'Predictive Credit Analysis', 
                desc: 'Understand how a new EMI changes your credit utilization before you apply.', 
                icon: '📈' 
              }
            ].map((f, i) => (
              <Card key={i} className="p-10 bg-surfaceLight/30 border-white/5 hover:border-orange/20 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-xl font-bold mb-4 font-serif italic tracking-tight">{f.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Behavioral Econ */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 flex justify-center gap-4 grayscale opacity-50">
            <span className="text-[10px] font-black uppercase tracking-widest border border-white/10 px-3 py-1 rounded">Privacy First</span>
            <span className="text-[10px] font-black uppercase tracking-widest border border-white/10 px-3 py-1 rounded">Behavioral Econ</span>
            <span className="text-[10px] font-black uppercase tracking-widest border border-white/10 px-3 py-1 rounded">No Judgment</span>
          </div>
          <h2 className="text-3xl font-serif italic mb-6">Built for real humans, not spreadsheets.</h2>
          <p className="text-gray-500 font-light italic">
            "FinFlow assumes you have feelings, goals, and occasionally want a nice dinner. It doesn't scold you for spending; it just helps you understand the price of doing so."
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif italic font-bold mb-10 leading-tight">Ready for clarity?</h2>
          <p className="text-xl text-gray-400 mb-12 font-light">Join 12,000+ others waiting to master their financial future.</p>
          <Button size="lg" onClick={() => login('waitlist@finflow.app')} className="bg-orange text-black px-12 py-5 text-lg">Join the Waitlist</Button>
          <p className="mt-8 text-xs text-gray-600 font-black uppercase tracking-widest">No credit card required. No hidden fees.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center text-gray-600 text-xs">
        <p className="font-black uppercase tracking-[0.3em] mb-4">FinFlow Technologies</p>
        <p className="font-light">Design-led decision intelligence. &copy; 2024</p>
      </footer>
    </div>
  );
};

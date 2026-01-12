
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Goals: React.FC = () => {
  const { goals, user, inviteToGoal } = useApp();
  const [inviteModal, setInviteModal] = useState<string | null>(null);

  return (
    <div className="pb-24 animate-fade-in px-4">
      <div className="flex justify-between items-center mb-10 pt-2">
        <h1 className="text-3xl font-bold text-white tracking-tighter italic font-serif">your milestones</h1>
        <Button size="sm" className="bg-white text-black font-black uppercase tracking-widest text-[10px] px-5 py-2 shadow-2xl">
          Plan Milestone
        </Button>
      </div>

      <p className="text-[11px] text-gray-500 font-medium mb-8 leading-relaxed px-2">
        These are the big things you're working toward. We've mapped your current pace to estimated arrival dates.
      </p>

      <div className="space-y-8">
        {goals.map(goal => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          // Mock arrival context
          const arrivalDate = goal.deadline; 
          const onTrack = percent > 20;

          return (
            <Card key={goal.id} className="p-8 rounded-[3rem] bg-surfaceLight border-none shadow-2xl overflow-visible relative group">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[2rem] bg-black flex items-center justify-center text-4xl shadow-inner border border-white/5">
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">{goal.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-3">
                        {goal.contributors.map(c => (
                          <div key={c} className="w-7 h-7 rounded-full bg-orange border-2 border-surfaceLight text-[10px] flex items-center justify-center font-black text-black">
                            {c.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{goal.contributors.length} Collaborative Contributors</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setInviteModal(goal.id)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-orange transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                <div 
                  className="absolute h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${percent}%`, backgroundColor: goal.color, boxShadow: `0 0 20px ${goal.color}60` }}
                ></div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                   <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Funded Pool</p>
                   <p className="text-2xl font-black text-white">₹{goal.currentAmount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-orange font-black uppercase tracking-widest mb-1 italic">
                     {onTrack ? 'On track for ' : 'Needs focus for '}{arrivalDate}
                   </p>
                   <p className="text-sm font-black italic opacity-60" style={{color: goal.color}}>
                     Target: ₹{(goal.targetAmount/100000).toFixed(1)}L
                   </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Invite Modal */}
      {inviteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-fade-in">
          <Card className="w-full max-w-sm p-10 bg-surface border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-[3rem]">
            <h3 className="text-2xl font-serif italic text-white mb-3 tracking-tight">add a partner</h3>
            <p className="text-[11px] text-gray-500 mb-10 leading-relaxed uppercase font-black tracking-widest">
              shared milestones are reached 2x faster when intentions are aligned.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => { 
                  inviteToGoal(inviteModal, user?.partnerName || 'Partner'); 
                  setInviteModal(null); 
                }}
                className="w-full bg-orange text-black py-5 text-[10px] uppercase font-black tracking-[0.2em] rounded-2xl"
              >
                Connect with {user?.partnerName}
              </Button>
              <button onClick={() => setInviteModal(null)} className="w-full text-gray-500 text-[10px] uppercase font-black tracking-widest mt-4">Maybe later</button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

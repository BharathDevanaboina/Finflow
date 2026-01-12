
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Profile } from './Profile';

export const Dashboard: React.FC = () => {
  const { 
    user, netWorth, assets, balance, projectedSurplus
  } = useApp();

  const [showProfile, setShowProfile] = useState(false);
  
  return (
    <div className="space-y-8 pb-24 animate-fade-in px-4">
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      
      {/* Human-Centric Header */}
      <div className="flex justify-between items-end pt-4 mb-2">
        <div>
          <h1 className="text-[10px] font-black text-orange uppercase tracking-[0.4em] mb-2">Current Posture</h1>
          <h2 className="text-4xl font-serif italic text-white leading-tight">your plan is solid, {user?.name}</h2>
        </div>
        <div className="text-right cursor-pointer group" onClick={() => setShowProfile(true)}>
           <div className="w-10 h-10 rounded-full bg-surfaceLight border border-white/10 flex items-center justify-center text-lg mb-1 group-hover:bg-white/10 transition-colors">
              👤
           </div>
           <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest group-hover:text-orange">Edit Profile</p>
        </div>
      </div>

      {/* Confidence Snapshot */}
      <div className="bg-surfaceLight/50 p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-32 bg-orange/5 blur-[120px] rounded-full -mr-24 -mt-24"></div>
        
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">90-Day Safety Margin</p>
            <p className="text-5xl font-black text-white tracking-tighter">₹{projectedSurplus[2].toLocaleString()}</p>
            <p className="text-[9px] text-orange font-bold uppercase mt-2 italic">Based on your calibrated baseline</p>
          </div>
          <div className="text-right">
             <div className="flex items-center gap-2 justify-end mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Safe for today</p>
             </div>
             <p className="text-2xl font-black text-white">₹{balance.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 relative z-10">
          {[
            { label: 'Next Month', val: projectedSurplus[0], status: 'Confident' },
            { label: 'Month 2', val: projectedSurplus[1], status: 'Steady' },
            { label: 'Month 3', val: projectedSurplus[2], status: 'Secure' }
          ].map((item, i) => (
            <div key={i} className="bg-black/40 p-4 rounded-[2rem] border border-white/5 text-center group hover:border-orange/30 transition-all">
              <p className="text-[9px] text-gray-500 font-black mb-1 uppercase tracking-tighter">{item.label}</p>
              <p className="text-md font-black text-white">₹{(item.val/1000).toFixed(1)}k</p>
              <p className="text-[8px] text-orange/50 font-bold uppercase mt-1">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Foundation Breakdown */}
      <section>
        <div className="flex justify-between items-center mb-6 px-4">
           <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Where you're building</h3>
           <span className="text-[9px] text-orange font-black uppercase italic tracking-widest">Total Foundation: ₹{netWorth.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {assets.map(asset => (
            <Card key={asset.type} className="p-6 bg-surfaceLight/80 border-white/5 shadow-xl hover:bg-white/5 transition-all rounded-[2.5rem]">
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl shadow-inner border border-white/5">
                  {asset.type === 'Cash' ? '💵' : asset.type === 'Gold' ? '📀' : asset.type === 'SIP' ? '📈' : '🏛️'}
                </div>
                {asset.growth > 0 && (
                  <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                    <span className="text-[9px] font-black">+{asset.growth}%</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{asset.type}</p>
              <p className="text-xl font-black text-white tracking-tighter">₹{asset.currentValue.toLocaleString()}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Shared Progress */}
      <Card className="p-8 bg-gradient-to-br from-[#1c1c22] to-black border-none shadow-2xl overflow-hidden relative group cursor-pointer rounded-[3rem]">
        <div className="flex justify-between items-center relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span>
              <p className="text-[10px] text-orange font-black uppercase tracking-widest">Collaborative Effort</p>
            </div>
            <h4 className="text-2xl font-serif italic text-white tracking-tight">Home Fund with {user?.partnerName || 'Partner'}</h4>
          </div>
          <div className="flex -space-x-4">
            {['A', (user?.partnerName || 'P').charAt(0)].map((c, i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-surface border-4 border-surfaceLight flex items-center justify-center font-black text-xs text-orange shadow-2xl">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Shared Pool</p>
            <p className="text-2xl font-black text-white">₹12.0L</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] text-orange font-black uppercase italic mb-1">Expected: Dec 2025</p>
             <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[24%] bg-orange"></div>
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

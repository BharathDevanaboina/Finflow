
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Profile: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, updateUser } = useApp();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    partnerName: user?.partnerName || '',
    monthlyIncome: user?.monthlyIncome || 0,
    monthlyFixedCosts: user?.monthlyFixedCosts || 0,
    savingsTarget: user?.savingsTarget || 0,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    updateUser({
      name: formData.name,
      partnerName: formData.partnerName,
      monthlyIncome: Number(formData.monthlyIncome),
      monthlyFixedCosts: Number(formData.monthlyFixedCosts),
      savingsTarget: Number(formData.savingsTarget)
    });
    setIsSaved(true);
    setTimeout(() => onClose(), 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 flex justify-between items-center border-b border-white/5 bg-background/90 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-serif italic text-white tracking-tight">System Calibration</h1>
          <p className="text-[10px] text-orange font-black uppercase tracking-widest">Tune Your Baseline</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        {/* Identity Section */}
        <section>
          <h2 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4">Identity & Partners</h2>
          <Card className="p-6 bg-surfaceLight/50 border-white/5 space-y-4">
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-2">Display Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-orange/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-2">Partner Name (For Goals)</label>
              <input 
                type="text" 
                value={formData.partnerName}
                onChange={(e) => handleChange('partnerName', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-orange/50 transition-all"
              />
            </div>
          </Card>
        </section>

        {/* Financial Core Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Financial Core</h2>
            <span className="text-[9px] text-orange italic">Affects 90-day Projections</span>
          </div>
          
          <Card className="p-6 bg-surfaceLight/50 border-white/5 space-y-6">
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-2">Base Monthly Inflow (Net Salary)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-serif italic text-lg">₹</span>
                <input 
                  type="number" 
                  value={formData.monthlyIncome}
                  onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white text-xl font-bold focus:outline-none focus:border-green-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-2">Fixed Commitments (Rent, EMI)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-serif italic text-lg">₹</span>
                <input 
                  type="number" 
                  value={formData.monthlyFixedCosts}
                  onChange={(e) => handleChange('monthlyFixedCosts', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white text-xl font-bold focus:outline-none focus:border-orange/50 transition-all"
                />
              </div>
              <p className="text-[10px] text-gray-600 mt-2 leading-relaxed">
                This is your "survival number". We subtract this automatically from your projections to show you what's actually safe to spend.
              </p>
            </div>
          </Card>
        </section>

        {/* Growth Section */}
        <section>
          <h2 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4">Growth Targets</h2>
          <Card className="p-6 bg-surfaceLight/50 border-white/5">
             <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-2">Monthly Savings Target</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-serif italic text-lg">₹</span>
                <input 
                  type="number" 
                  value={formData.savingsTarget}
                  onChange={(e) => handleChange('savingsTarget', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white text-xl font-bold focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </div>
          </Card>
        </section>

        <div className="pt-4 pb-12">
           <Button 
             onClick={handleSave} 
             className={`w-full py-5 text-sm uppercase font-black tracking-widest rounded-2xl ${isSaved ? 'bg-green-500 text-white' : 'bg-orange text-black'}`}
           >
             {isSaved ? 'System Calibrated ✓' : 'Update Baseline'}
           </Button>
        </div>
      </div>
    </div>
  );
};

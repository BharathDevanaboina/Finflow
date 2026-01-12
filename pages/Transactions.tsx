
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Transaction } from '../types';

export const Transactions: React.FC = () => {
  const { filteredTransactions, selectedPeriod } = useApp();
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const res: Record<string, { total: number; txs: Transaction[] }> = {};
    filteredTransactions.forEach(tx => {
      if (!res[tx.category]) res[tx.category] = { total: 0, txs: [] };
      res[tx.category].total += tx.amount;
      res[tx.category].txs.push(tx);
    });
    return res;
  }, [filteredTransactions]);

  const expenseGroups = Object.entries(grouped)
    .filter(([cat]) => filteredTransactions.find(t => t.category === cat)?.type !== 'income');
  
  const incomeGroups = Object.entries(grouped)
    .filter(([cat]) => filteredTransactions.find(t => t.category === cat)?.type === 'income');

  const getIcon = (cat: string) => {
    const map: Record<string, string> = { Salary: '💰', SIP: '📈', Rent: '🏠', Shopping: '🛍️', Food: '🍔', P2P: '🤝', Gold: '📀' };
    return map[cat] || '🏷️';
  };

  return (
    <div className="pb-24 animate-fade-in px-4">
      <div className="flex justify-between items-center mb-8 pt-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic font-serif">flow history</h1>
          <p className="text-[10px] text-orange font-black uppercase tracking-[0.5em] mt-1">{selectedPeriod}</p>
        </div>
        {viewMode === 'detail' && (
          <Button size="sm" variant="ghost" onClick={() => setViewMode('summary')} className="text-gray-500 font-black uppercase text-[10px]">← Summary</Button>
        )}
      </div>

      {viewMode === 'summary' ? (
        <div className="space-y-12">
          <section>
            <h2 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-6 flex items-center justify-between">
              <span>Planned & Variable Costs</span>
              <span className="text-orange/50 italic">Outbound</span>
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {expenseGroups.map(([cat, data]) => (
                <div 
                  key={cat} 
                  onClick={() => { setSelectedCat(cat); setViewMode('detail'); }}
                  className="bg-surfaceLight/50 p-6 rounded-[2.5rem] border border-white/5 hover:border-orange/30 transition-all cursor-pointer shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black border border-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {getIcon(cat)}
                  </div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider mb-1">{cat}</p>
                  <p className="text-xl font-black text-white">₹{data.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-6 flex items-center justify-between">
              <span>Inbound Resource</span>
              <span className="text-green-500/50 italic">Growth</span>
            </h2>
            <div className="space-y-4">
              {incomeGroups.map(([cat, data]) => (
                <div 
                  key={cat} 
                  onClick={() => { setSelectedCat(cat); setViewMode('detail'); }}
                  className="bg-surfaceLight/50 p-6 rounded-[2.5rem] border border-white/5 hover:border-green-500/30 transition-all cursor-pointer flex justify-between items-center shadow-lg group"
                >
                  <div className="flex items-center gap-5">
                    <div className="text-3xl group-hover:scale-110 transition-transform">{getIcon(cat)}</div>
                    <div>
                      <p className="text-white font-black tracking-tight">{cat}</p>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{data.txs.length} Arrivals</p>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-green-500">+₹{data.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="animate-slide-up">
           <Card className="p-12 text-center mb-10 bg-gradient-to-b from-[#18191f] to-black border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative rounded-[3.5rem]">
              <div className="text-7xl mb-6">{getIcon(selectedCat!)}</div>
              <h2 className="text-3xl font-serif italic text-white tracking-tight">{selectedCat}</h2>
              <p className="text-[10px] text-orange font-black uppercase tracking-[0.5em] mt-2 italic">Reflective Breakdown</p>
              <div className="text-5xl font-black text-white mt-10 tracking-tighter">₹{grouped[selectedCat!].total.toLocaleString()}</div>
           </Card>

           <div className="space-y-4 px-2">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-6">Specific Instances</p>
              {grouped[selectedCat!].txs.map(tx => (
                <div key={tx.id} className="bg-surfaceLight/30 p-6 rounded-[2rem] border border-white/5 flex justify-between items-center backdrop-blur-sm">
                  <div className="flex-1">
                    <p className="text-white font-bold text-lg tracking-tight">{tx.description}</p>
                    <p className="text-[10px] text-gray-500 font-black uppercase mt-1 tracking-widest italic">{tx.date}</p>
                  </div>
                  <p className="text-xl font-black text-white tracking-tighter">₹{tx.amount.toLocaleString()}</p>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

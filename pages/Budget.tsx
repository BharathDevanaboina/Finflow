
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Budget: React.FC = () => {
  const { debts, addTransaction } = useApp();
  const [activeFriend, setActiveFriend] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const handleP2P = (friendId: string, type: 'lent' | 'received') => {
    if (!amount) return;
    addTransaction({
      amount: parseFloat(amount),
      category: 'P2P',
      description: `${type === 'lent' ? 'Lent to' : 'Received from'} friend`,
      date: new Date().toISOString().split('T')[0],
      type: type === 'lent' ? 'p2p_payment' : 'p2p_receive',
      friendId: friendId
    });
    setAmount('');
    setActiveFriend(null);
  };

  return (
    <div className="pb-24 animate-fade-in px-4">
      <div className="flex justify-between items-center mb-10 pt-2">
        <h1 className="text-3xl font-bold text-white tracking-tighter italic font-serif">shared life</h1>
        <Button size="sm" className="bg-white text-black font-black uppercase text-[10px] px-5 py-2 tracking-widest shadow-xl">
          New Settlement
        </Button>
      </div>

      <p className="text-[11px] text-gray-500 font-medium mb-8 leading-relaxed px-2">
        Shared moments shouldn't feel like debts. Use this space to keep things balanced and calm with your inner circle.
      </p>

      <div className="space-y-6">
        {debts.map(friend => (
          <Card key={friend.id} className="p-6 rounded-[2.5rem] bg-surfaceLight border-none shadow-xl transition-all">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange/20 to-black flex items-center justify-center font-black text-orange border border-white/5">
                  {friend.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{friend.name}</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Settled on {friend.lastTransaction}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                  {friend.amount === 0 ? 'You are even' : friend.amount > 0 ? 'Due to you' : 'Settlement needed'}
                </p>
                <p className={`text-xl font-black ${friend.amount >= 0 ? 'text-green-500' : 'text-orange'}`}>
                   ₹{Math.abs(friend.amount).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setActiveFriend(activeFriend === friend.id ? null : friend.id)}
                className="flex-1 py-4 rounded-3xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Update balance
              </button>
              <button className="flex-1 py-4 rounded-3xl bg-orange/10 hover:bg-orange/20 text-orange text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                Nudge gently
              </button>
            </div>

            {activeFriend === friend.id && (
              <div className="mt-6 pt-6 border-t border-white/5 animate-slide-up space-y-4">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest text-center">Enter the amount shared</p>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-orange text-2xl">₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 pl-12 pr-6 text-white font-black text-2xl focus:outline-none focus:border-orange transition-all text-center"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3">
                   <Button onClick={() => handleP2P(friend.id, 'lent')} className="flex-1 bg-green-500 text-white text-[10px] uppercase font-black py-4 rounded-2xl">I Paid</Button>
                   <Button onClick={() => handleP2P(friend.id, 'received')} className="flex-1 bg-white text-black text-[10px] uppercase font-black py-4 rounded-2xl">They Paid</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      {debts.length === 0 && (
        <div className="text-center py-20 px-10">
           <div className="text-4xl mb-4 opacity-20">🍃</div>
           <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
             everything is perfectly balanced. <br/> add a friend to start sharing moments.
           </p>
           <Button size="sm" className="mt-6 bg-white/5 text-gray-400 border border-white/5">+ Add Contact</Button>
        </div>
      )}
    </div>
  );
};

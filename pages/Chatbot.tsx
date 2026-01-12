
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import { parseDecisionIntent } from '../services/geminiService';

export const Chatbot: React.FC = () => {
  const { balance, projectedSurplus, goals, monthlyFixed } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hi Arjun. I’m your Decision Lab assistant. Instead of tracking what you’ve spent, I’m here to help you model what you’re about to spend. \n\nWhat decision are we looking at today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await parseDecisionIntent(userMsg.text, {
        balance,
        projected90d: projectedSurplus[2],
        goals,
        fixedExpenses: monthlyFixed
      });
      
      const botMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: result.analysis || result.textResponse, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: "I'm reflecting on your data. Let's try once more with a specific purchase or EMI in mind.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in px-4">
      <div className="text-center py-4 border-b border-white/5 mb-6">
        <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">The Decision Lab</h2>
        <p className="text-[9px] text-orange font-bold uppercase mt-1 italic">Modeling Your 90-Day Impact</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 no-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-6 rounded-3xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-white/5 text-white border border-white/10' 
                : 'bg-surfaceLight/80 text-gray-200 border border-white/5 shadow-2xl backdrop-blur-md'
            }`}>
              <div className="prose prose-invert prose-sm">
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-2 last:mb-0">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-surfaceLight/50 p-4 rounded-3xl border border-white/5">
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 bg-orange rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-orange rounded-full animate-bounce delay-150"></div>
                        <div className="w-1.5 h-1.5 bg-orange rounded-full animate-bounce delay-300"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
         {[
           '"Buy the iPhone 15?"', 
           '"New SIP of 10k?"', 
           '"EMI for Car Loan?"', 
           '"Cancel my Netflix?"'
         ].map(suggestion => (
           <button 
             key={suggestion}
             onClick={() => setInput(suggestion.replace(/"/g, ''))}
             className="text-[9px] font-black uppercase text-gray-500 border border-white/5 py-3 rounded-2xl hover:bg-white/5 hover:border-orange/30 transition-all text-center"
           >
             {suggestion}
           </button>
         ))}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input 
          type="text" 
          className="w-full bg-surface border border-white/10 rounded-3xl py-5 pl-8 pr-16 text-white font-medium focus:outline-none focus:border-orange/50 shadow-2xl transition-all"
          placeholder="I'm thinking of spending..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !input}
          className="absolute right-3 top-3 p-3 bg-orange rounded-2xl text-black shadow-lg shadow-orange/20 hover:scale-105 active:scale-95 disabled:opacity-30 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};

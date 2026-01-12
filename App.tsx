import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Goals } from './pages/Goals';
import { Chatbot } from './pages/Chatbot';
import { Budget } from './pages/Budget';
import { BottomNav } from './components/BottomNav';

const App: React.FC = () => {
  const { user, showMobileLayout, toggleLayout, logout } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user || !showMobileLayout) {
    return <LandingPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'budget': return <Budget />;
      case 'transactions': return <Transactions />;
      case 'goals': return <Goals />;
      case 'chatbot': return <Chatbot />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex justify-center">
      {/* 
        This wrapper mimics a mobile app container on larger screens 
        to maintain the mobile-first design aesthetic requested in the prompt
        for the "Mobile App" part.
      */}
      <div className="w-full lg:max-w-md lg:border-x lg:border-white/5 lg:shadow-2xl min-h-screen relative flex flex-col bg-[#0f1014]">
        
        {/* Desktop-only warning/toggle for dev convenience */}
        <div className="hidden lg:flex absolute -right-48 top-4 flex-col gap-2">
           <button onClick={logout} className="text-xs text-gray-500 hover:text-white underline">Logout / Back to Landing</button>
           <div className="text-[10px] text-gray-600 w-40">Previewing Mobile View</div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
          {renderContent()}
        </main>

        {/* Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
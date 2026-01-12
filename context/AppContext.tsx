
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Transaction, Goal, User, Asset, FriendDebt, AppContextType, AssetType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with default calibration data
  const [user, setUser] = useState<User | null>({ 
    name: 'Arjun', 
    email: 'arjun@finflow.io', 
    partnerName: 'Riya',
    monthlyIncome: 125000,
    monthlyFixedCosts: 53500, // Rent + EMI default
    savingsTarget: 30000
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2023-12');
  const [showMobileLayout, setShowMobileLayout] = useState(true);

  // Core Data Source - Consistent across app
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', amount: 125000, category: 'Salary', description: 'Monthly Payroll', date: '2023-12-01', type: 'income' },
    { id: '2', amount: 15000, category: 'SIP', description: 'Quant Small Cap', date: '2023-12-05', type: 'investment', assetType: 'SIP', isRecurring: true },
    { id: '3', amount: 45000, category: 'Rent', description: 'HSR Apt', date: '2023-12-02', type: 'expense', isRecurring: true },
    { id: '4', amount: 8500, category: 'EMI', description: 'iPhone 15 Pro', date: '2023-12-10', type: 'emi', isRecurring: true },
    { id: '5', amount: 2200, category: 'Food', description: 'Dinner Out', date: '2023-12-12', type: 'expense' },
    { id: '6', amount: 1500, category: 'Friend', description: 'Lunch Owed', date: '2023-12-15', type: 'p2p_payment', friendId: 'f1' },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: 'g1', name: 'Japan Trip', targetAmount: 300000, currentAmount: 85000, deadline: '2024-04-01', icon: '🗾', color: '#D4AF37', contributors: ['Arjun'] },
    { id: 'g2', name: 'Home Fund', targetAmount: 5000000, currentAmount: 1200000, deadline: '2026-12-01', icon: '🏠', color: '#3b82f6', contributors: ['Arjun', 'Riya'] },
  ]);

  const addTransaction = (txData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = { ...txData, id: Math.random().toString(36).substr(2, 9) };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateGoalAmount = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g));
  };

  const inviteToGoal = (goalId: string, name: string) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, contributors: [...new Set([...g.contributors, name])] } : g));
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const login = (email: string) => setUser({ 
    name: 'Arjun', 
    email, 
    partnerName: 'Riya',
    monthlyIncome: 125000,
    monthlyFixedCosts: 53500,
    savingsTarget: 30000
  });
  const logout = () => setUser(null);
  const toggleLayout = () => setShowMobileLayout(p => !p);

  // --- Derived Calculations ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => tx.date.startsWith(selectedPeriod));
  }, [transactions, selectedPeriod]);

  const { income, fixed, variable, investment } = useMemo(() => {
    return filteredTransactions.reduce((acc, tx) => {
      if (tx.type === 'income') acc.income += tx.amount;
      else if (tx.type === 'emi' || (tx.type === 'expense' && tx.isRecurring)) acc.fixed += tx.amount;
      else if (tx.type === 'expense' || tx.type === 'p2p_payment') acc.variable += tx.amount;
      else if (tx.type === 'investment') acc.investment += tx.amount;
      return acc;
    }, { income: 0, fixed: 0, variable: 0, investment: 0 });
  }, [filteredTransactions]);

  const balance = income - fixed - variable - investment;

  // 90 Day Projections - NOW POWERED BY PROFILE CALIBRATION
  const projectedSurplus = useMemo(() => {
    if (!user) return [0, 0, 0];

    // Source of Truth: User Profile Input
    const calibratedIncome = user.monthlyIncome; 
    const calibratedFixed = user.monthlyFixedCosts;
    
    // We assume 'variable' is what changes month to month, so we take the current average or actual
    // If no variable spend yet, assume a buffer of 15% of income
    const assumedVariable = variable > 0 ? variable : (calibratedIncome * 0.15);
    
    // Monthly Surplus = Income - (Fixed Commitments + Variable Spend)
    const monthlySurplus = calibratedIncome - calibratedFixed - assumedVariable;

    return [monthlySurplus, monthlySurplus * 2, monthlySurplus * 3];
  }, [user, variable]);

  const assets: Asset[] = useMemo(() => {
    const categories: AssetType[] = ['Cash', 'SIP', 'Shares', 'Mutual Funds', 'Gold'];
    const seedValues: Record<string, number> = { 'Cash': balance, 'SIP': 120000, 'Gold': 250000, 'Shares': 450000, 'Mutual Funds': 800000 };
    return categories.map(cat => ({
      type: cat,
      currentValue: seedValues[cat] || 0,
      growth: cat === 'Cash' ? 0 : 11.2
    }));
  }, [balance]);

  const debts: FriendDebt[] = useMemo(() => {
    const map: Record<string, FriendDebt> = {};
    transactions.forEach(t => {
      if (t.friendId) {
        if (!map[t.friendId]) map[t.friendId] = { id: t.friendId, name: 'Kabir', amount: 0, lastTransaction: t.date };
        if (t.type === 'p2p_payment') map[t.friendId].amount += t.amount;
        if (t.type === 'p2p_receive') map[t.friendId].amount -= t.amount;
      }
    });
    return Object.values(map);
  }, [transactions]);

  const netWorth = useMemo(() => assets.reduce((sum, a) => sum + a.currentValue, 0), [assets]);

  return (
    <AppContext.Provider value={{
      user, updateUser, selectedPeriod, setSelectedPeriod, transactions, addTransaction, goals, updateGoalAmount, inviteToGoal,
      assets, debts, filteredTransactions, monthlyIncome: income, monthlyFixed: fixed, monthlyVariable: variable, 
      monthlyInvestment: investment, netWorth, balance, projectedSurplus, login, logout, showMobileLayout, toggleLayout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

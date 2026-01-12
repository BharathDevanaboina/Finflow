
export type TransactionType = 'income' | 'expense' | 'investment' | 'p2p_payment' | 'p2p_receive' | 'emi';
export type AssetType = 'Cash' | 'SIP' | 'Shares' | 'Mutual Funds' | 'Gold' | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // YYYY-MM-DD
  type: TransactionType;
  assetType?: AssetType; 
  friendId?: string;
  isRecurring?: boolean;
}

export interface Asset {
  type: AssetType;
  currentValue: number;
  growth: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
  contributors: string[];
}

export interface FriendDebt {
  id: string;
  name: string;
  amount: number;
  lastTransaction: string;
}

export interface User {
  name: string;
  email: string;
  partnerName?: string;
  // Financial Baseline
  monthlyIncome: number;
  monthlyFixedCosts: number; // Rent, Fixed EMIs
  savingsTarget: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AppContextType {
  user: User | null;
  updateUser: (data: Partial<User>) => void; // New method to update profile
  selectedPeriod: string; 
  setSelectedPeriod: (period: string) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  goals: Goal[];
  updateGoalAmount: (goalId: string, amount: number) => void;
  inviteToGoal: (goalId: string, name: string) => void;
  assets: Asset[];
  debts: FriendDebt[];
  // Derived state for Decision Support
  filteredTransactions: Transaction[];
  monthlyIncome: number;
  monthlyFixed: number; 
  monthlyVariable: number;
  monthlyInvestment: number;
  netWorth: number;
  balance: number;
  projectedSurplus: number[]; // [30d, 60d, 90d]
  // Auth and Layout
  login: (email: string) => void;
  logout: () => void;
  showMobileLayout: boolean;
  toggleLayout: () => void;
}

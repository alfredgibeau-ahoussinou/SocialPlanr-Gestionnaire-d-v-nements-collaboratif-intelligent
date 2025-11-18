// Types pour SocialPlanr - Gestion des finances

export interface Account {
  id: string;
  name: string;
  description?: string;
  type: 'personal' | 'business';
  balance: number;
  currency: 'EUR' | 'USD' | 'XOF' | 'GBP';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived';
}

export interface Transaction {
  id: string;
  accountId: string;
  account?: Account;
  type: 'income' | 'expense';
  amount: number;
  category: TransactionCategory;
  description?: string;
  date: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  name: string;
  category: BudgetCategory;
  limit: number;
  spent: number;
  period: BudgetPeriod;
  startDate: Date;
  endDate?: Date;
  type: 'personal' | 'business';
  accountId?: string;
  account?: Account;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'completed' | 'archived';
}

export type TransactionCategory =
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'other';

export type BudgetCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'travel'
  | 'other';

export type BudgetPeriod = 'monthly' | 'yearly' | 'custom';

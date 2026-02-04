import { TransactionType } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const getAmountColor = (type: TransactionType): string => {
  return type === 'income' ? '#10B981' : '#EF4444';
};

export const formatAmountWithSign = (amount: number, type: TransactionType): string => {
  const formatted = formatCurrency(amount);
  return type === 'income' ? `+${formatted}` : `-${formatted}`;
};

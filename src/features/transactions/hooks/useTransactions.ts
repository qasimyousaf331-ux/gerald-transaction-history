import { useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, TransactionFilter } from '../types';
import { transactions as mockTransactions } from '../data';
import { useDebounce } from './useDebounce';

interface UseTransactionsResult {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: TransactionFilter;
  setFilter: (filter: TransactionFilter) => void;
}

export function useTransactions(): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<TransactionFilter>('all');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      if (Math.random() < 0.05) {
        throw new Error('Failed to fetch transactions');
      }

      setTransactions(mockTransactions);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (filter !== 'all') {
      result = result.filter(transaction => transaction.type === filter);
    }

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(transaction =>
        transaction.merchant.toLowerCase().includes(query)
      );
    }

    return result;
  }, [transactions, filter, debouncedSearchQuery]);

  return {
    transactions,
    filteredTransactions,
    loading,
    error,
    refresh: fetchTransactions,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  };
}

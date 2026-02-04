import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TransactionFilter } from '../types';

interface FilterButtonsProps {
  activeFilter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters: { label: string; value: TransactionFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expenses', value: 'expense' },
  ];

  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <TouchableOpacity
            key={filter.value}
            style={[styles.button, isActive && styles.buttonActive]}
            onPress={() => onFilterChange(filter.value)}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, isActive && styles.buttonTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  buttonTextActive: {
    color: '#FFFFFF',
  },
});

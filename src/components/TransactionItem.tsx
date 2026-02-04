import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types/transaction';
import { formatCurrency, formatDate, getAmountColor, formatAmountWithSign } from '../utils';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const amountColor = getAmountColor(transaction.type);
  const formattedAmount = formatAmountWithSign(transaction.amount, transaction.type);
  const formattedDate = formatDate(transaction.date);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.merchant}>{transaction.merchant}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.category}>{transaction.category}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {formattedAmount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 13,
    color: '#6B7280',
  },
  separator: {
    fontSize: 13,
    color: '#D1D5DB',
    marginHorizontal: 6,
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
  },
});

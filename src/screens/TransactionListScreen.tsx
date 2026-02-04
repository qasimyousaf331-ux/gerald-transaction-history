import React, { useCallback } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionItem, FilterButtons, SearchBar } from "../components";

export const TransactionListScreen = () => {
  const {
    filteredTransactions,
    loading,
    error,
    refresh,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    transactions,
  } = useTransactions();

  const ListEmptyComponent = useCallback(() => {
    const hasActiveFilters = filter !== 'all' || searchQuery.trim() !== '';
    const message = hasActiveFilters
      ? 'No transactions match your filters'
      : 'No transactions available';

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{message}</Text>
        {hasActiveFilters && (
          <Text style={styles.emptySubtext}>
            Try adjusting your search or filters
          </Text>
        )}
      </View>
    );
  }, [filter, searchQuery]);

  const renderItem = useCallback(
    ({ item }: { item: typeof filteredTransactions[0] }) => (
      <TransactionItem transaction={item} />
    ),
    []
  );
  
  if (loading && transactions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorSubtext}>Pull down to retry</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
      </View>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        renderItem={renderItem}
        contentContainerStyle={
          filteredTransactions.length === 0 ? styles.emptyListContent : undefined
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

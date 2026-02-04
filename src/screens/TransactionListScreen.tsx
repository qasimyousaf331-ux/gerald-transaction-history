// src/screens/TransactionListScreen.tsx
import React from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useTransactions } from "../hooks/useTransactions";

export const TransactionListScreen = () => {
  const { filteredTransactions, loading, error, refresh } = useTransactions();

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading transactions...</Text>
      </View>
    );

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );

  if (!filteredTransactions || filteredTransactions.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No transactions available</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text>{item.merchant}</Text>
            <Text>${item.amount.toFixed(2)}</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

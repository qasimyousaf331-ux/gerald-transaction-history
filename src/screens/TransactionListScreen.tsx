import React from "react";
import { View, Text } from "react-native";
import { transactions } from "../data/transactions.mock";

export const TransactionListScreen = () => (
  <View style={{ padding: 16, marginTop: 10 }}>
    <Text>Transaction History</Text>
    <Text>Total transactions: {transactions.length}</Text>
  </View>
);

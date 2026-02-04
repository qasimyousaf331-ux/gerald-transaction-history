export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  merchant: string;      
  amount: number;       
  date: string;         
  category: string;
  type: TransactionType;
}

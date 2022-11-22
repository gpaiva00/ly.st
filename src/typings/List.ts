import { HistoryItem } from "@typings/History";

export interface List {
  id: string;
  title: string;
  spendingLimit: number;
  items: ListItem[];
  total: string;
  history: HistoryItem[];
}

export interface ListItem {
  id: string;
  title: string;
  categoryID: string;
  completed: boolean;
  quantity: number;
  price: number;
}

export interface ItemsByCategory {
  categoryID: string;
  items: ListItem[];
}
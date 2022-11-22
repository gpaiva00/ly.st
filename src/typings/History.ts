import { ListItem } from "@typings/List";

export interface HistoryItem {
  id: string;
  createdAt: string;
  listItems: ListItem[];
  total: string;
}
export interface List {
  id: string;
  title: string;
  spendingLimit: number;
  items: ListItem[];
  total: number;
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
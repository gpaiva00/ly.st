import { ListItem } from "@typings/List";

export const calculateListTotal = (items: ListItem[]) => {
  return items.reduce((total, item) => {
    return total + (item.quantity || 1) * (item.price || 0);
  }, 0);
}
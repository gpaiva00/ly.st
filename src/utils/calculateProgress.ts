import { List } from "@typings/List";

export default function calculateProgress(list: List) {
  const { spendingLimit, items } = list;
  const totalSpent = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  
  const progress = (totalSpent / spendingLimit) * 100;

  return progress;
}
import { List } from "@typings/List";

export default function calculateProgress(list: List) {
  const { spendingLimit, items } = list;
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const progress = (total / spendingLimit) * 100;

  return progress;
}
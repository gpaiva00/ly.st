import { Category } from "@typings/Category";

export const getCategoryTitleByID = (id: string, categories: Category[]): string => {
  const category = categories.find(category => category.id === id);
  return category?.title;
}
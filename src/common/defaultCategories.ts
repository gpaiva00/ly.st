import { Category } from "@typings/Category";
import generateID from "@utils/generateID";

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: generateID(),
    title: "comidas",
    selected: false,
  },
  {
    id: generateID(),
    title: "bebidas",
    selected: false,
  },
  {
    id: generateID(),
    title: "produtos de limpeza",
    selected: false,
  },
  {
    id: generateID(),
    title: "doces",
    selected: false,
  },
  {
    id: generateID(),
    title: "hortifrúti",
    selected: false,
  }
]

export default DEFAULT_CATEGORIES

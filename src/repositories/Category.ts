import DEFAULT_CATEGORIES from '@common/defaultCategories'
import { CATEGORIES_STORAGE_KEY } from '@common/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Category } from '@typings/Category'

export const getCategories = async () => {
  const categories = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY)
  return categories ? JSON.parse(categories) : []
}

export const getCategory = async (id: string) => {
  const categories = await getCategories()
  const category = JSON.parse(categories).find((c: any) => c.id === id)
  return category
}


export const createCategory = async (category: any) => {
  const categories = await getCategories()
  categories.push(category)
  await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories))
}

export const createDefaultCategories = async () => {
  await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES))
}

export const deleteCategory = async (id: string) => {
  const categories = await getCategories()
  const newCategories = categories.filter((category: Category) => category.id !== id)
  await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(newCategories))
}
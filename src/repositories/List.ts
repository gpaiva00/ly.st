import { LISTS_STORAGE_KEY } from '@common/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { List } from '@typings/List'

export const getLists = async () => {
  const lists = await AsyncStorage.getItem(LISTS_STORAGE_KEY)
  return lists ? JSON.parse(lists) : []
}

export const getList = async (id: string) => {
  const lists = await getLists()
  return lists.find((list: List) => list.id === id)
}

export const createList = async (list: List) => {
  const lists = await getLists()
  lists.push(list)
  await AsyncStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(lists))
}

export const updateList = async (list: List) => {
  const lists = await getLists()
  const index = lists.findIndex((l: List) => l.id === list.id)
  lists[index] = list
  await AsyncStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(lists))
}

export const deleteList = async (id: string) => {
  const lists = await getLists()
  const newList = lists.filter((list: List) => list.id !== id)
  await AsyncStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(newList))
}


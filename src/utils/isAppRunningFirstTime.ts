import routesNames from "@common/routesNames";
import { FIST_TIME_STORAGE_KEY } from "@common/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const clearCategories = async () => {
  const firstTimeCategoriesKey = `${FIST_TIME_STORAGE_KEY}_${routesNames.CATEGORIES}`

  await AsyncStorage.removeItem(FIST_TIME_STORAGE_KEY)
  await AsyncStorage.removeItem(firstTimeCategoriesKey)
}

export default async function isAppRunningFirstTime() {
    // clearCategories()
    // return true

    const firstTimeStorage = await AsyncStorage.getItem(FIST_TIME_STORAGE_KEY)
    
    if (!firstTimeStorage) {
      await AsyncStorage.setItem(FIST_TIME_STORAGE_KEY, 'false')
      return true
    }
    
    return false
}

export const isScreenRunningFirstTime = async (screenName: string) => {
  const firstTimeKey = `${FIST_TIME_STORAGE_KEY}_${screenName}`
  const firstTimeStorage = await AsyncStorage.getItem(firstTimeKey)
  
  if (!firstTimeStorage) {
    await AsyncStorage.setItem(firstTimeKey, 'false')
    return true
  }
  
  return false
}

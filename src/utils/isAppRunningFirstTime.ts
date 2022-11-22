import { CATEGORIES_STORAGE_KEY, FIST_TIME_STORAGE_KEY } from "@common/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const clearCategories = async () => {
  await AsyncStorage.removeItem(FIST_TIME_STORAGE_KEY)
  await AsyncStorage.removeItem(CATEGORIES_STORAGE_KEY)
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
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Routes from './src/Routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Black: require('./assets/fonts/Montserrat-Black.ttf'),
    Bold: require('./assets/fonts/Montserrat-Bold.ttf'),
    ExtraBold: require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    Light: require('./assets/fonts/Montserrat-Light.ttf'),
    Medium: require('./assets/fonts/Montserrat-Medium.ttf'),
    Regular: require('./assets/fonts/Montserrat-Regular.ttf'),
    Semibold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    Thin: require('./assets/fonts/Montserrat-Thin.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style="dark" />
      <View
        style={{ flex: 1 }}
        onLayout={onLayoutRootView}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </View>
    </>
  )
}

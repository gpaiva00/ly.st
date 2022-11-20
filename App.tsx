import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { RootSiblingParent } from 'react-native-root-siblings'
import Routes from './src/Routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Black: require('./assets/fonts/Roboto-Black.ttf'),
    Bold: require('./assets/fonts/Roboto-Bold.ttf'),
    Light: require('./assets/fonts/Roboto-Light.ttf'),
    Medium: require('./assets/fonts/Roboto-Medium.ttf'),
    Regular: require('./assets/fonts/Roboto-Regular.ttf'),
    Thin: require('./assets/fonts/Roboto-Thin.ttf'),
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
          <RootSiblingParent>
            <Routes />
          </RootSiblingParent>
        </GestureHandlerRootView>
      </View>
    </>
  )
}

import routesNames from '@common/routesNames'
import isAppRunningFirstTime from '@utils/isAppRunningFirstTime'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { RootSiblingParent } from 'react-native-root-siblings'
import Routes from './src/Routes'

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false)
  const [appIsRunningFirstTime, setAppIsRunningFirstTime] = useState(null)

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  const renderContent = useCallback(() => {
    if (!appIsReady) {
      return <></>
    }

    let initialRouteName = routesNames.HOME

    if (appIsRunningFirstTime) initialRouteName = routesNames.ONBOARDING

    return <Routes initialRouteName={initialRouteName} />
  }, [appIsReady, appIsRunningFirstTime])

  useEffect(() => {
    async function prepare() {
      await Font.loadAsync({
        Black: require('./assets/fonts/Roboto-Black.ttf'),
        Bold: require('./assets/fonts/Roboto-Bold.ttf'),
        Light: require('./assets/fonts/Roboto-Light.ttf'),
        Medium: require('./assets/fonts/Roboto-Medium.ttf'),
        Regular: require('./assets/fonts/Roboto-Regular.ttf'),
        Thin: require('./assets/fonts/Roboto-Thin.ttf'),
      })

      const runningFirstTime = await isAppRunningFirstTime()
      setAppIsRunningFirstTime(runningFirstTime)
      setAppIsReady(true)
    }

    prepare()
  }, [])

  return (
    <>
      <StatusBar style="dark" />
      <View
        style={{ flex: 1 }}
        onLayout={onLayoutRootView}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootSiblingParent>{renderContent()}</RootSiblingParent>
        </GestureHandlerRootView>
      </View>
    </>
  )
}

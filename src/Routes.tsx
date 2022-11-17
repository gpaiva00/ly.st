import routesNames from '@common/routesNames'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from '@screens/Categories'
import Home from '@screens/Home'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routesNames.HOME}
        defaultScreenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={routesNames.HOME}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routesNames.CATEGORIES}
          component={Categories}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

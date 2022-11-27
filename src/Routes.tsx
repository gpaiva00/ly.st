import routesNames from '@common/routesNames'
import Onboarding from '@components/Onboarding'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from '@screens/Categories'
import Home from '@screens/Home'
import List from '@screens/List'
import ListConfigs from '@screens/ListConfigs'

const Stack = createNativeStackNavigator()

export default function Routes({ initialRouteName }: { initialRouteName: string }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        defaultScreenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={routesNames.ONBOARDING}
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
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
        <Stack.Screen
          name={routesNames.LIST}
          component={List}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routesNames.LIST_CONFIGS}
          component={ListConfigs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import styled from 'styled-components/native'

import type { Screens } from '@online-library/core'
import { navigationRef, useRole } from '@online-library/core'

import { theme } from '@online-library/ui'

import { Text } from 'components/shared/styled'

import {
   EmailSupportScreen,
   HomeScreen,
   LoginScreen,
   PasswordSupportScreen,
   RegistrationScreen,
   StoreScreen,
} from './screens'

const Tab = createBottomTabNavigator<Screens>()

export const App = () => {
   const { role } = useRole()

   useEffect(() => SplashScreen.hide(), [])

   return (
      <AppContainer>
         <NavigationContainer ref={navigationRef}>
            {role === 'guest' ? (
               <Tab.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                     headerShown: false,
                     tabBarStyle: { backgroundColor: theme.colors.primary },
                     tabBarLabelStyle: { display: 'none' },
                     tabBarItemStyle: { justifyContent: 'center' },
                     tabBarBadgeStyle: { backgroundColor: 'white' },
                  }}
               >
                  <Tab.Screen
                     name="Home"
                     component={HomeScreen}
                     options={{ tabBarIcon: () => <Text>Home</Text> }}
                  />
                  <Tab.Screen
                     name="Registration"
                     component={RegistrationScreen}
                     options={{ tabBarIcon: () => <Text>Registration</Text> }}
                  />
                  <Tab.Screen
                     name="Login"
                     component={LoginScreen}
                     options={{ tabBarIcon: () => <Text>Login</Text> }}
                  />
                  <Tab.Screen
                     name="EmailSupport"
                     component={EmailSupportScreen}
                     options={{ tabBarItemStyle: { display: 'none' } }}
                  />
                  <Tab.Screen
                     name="PasswordSupport"
                     component={PasswordSupportScreen}
                     options={{ tabBarItemStyle: { display: 'none' } }}
                  />
               </Tab.Navigator>
            ) : (
               <Tab.Navigator
                  initialRouteName="Store"
                  screenOptions={{
                     headerShown: false,
                     tabBarStyle: { backgroundColor: theme.colors.primary },
                     tabBarLabelStyle: { display: 'none' },
                     tabBarItemStyle: { justifyContent: 'center' },
                     tabBarBadgeStyle: { backgroundColor: 'white' },
                  }}
               >
                  <Tab.Screen
                     name="Store"
                     component={StoreScreen}
                     options={{ tabBarIcon: () => <Text>Store</Text> }}
                  />
               </Tab.Navigator>
            )}
         </NavigationContainer>
      </AppContainer>
   )
}

const AppContainer = styled.View`
   flex: 1;
`

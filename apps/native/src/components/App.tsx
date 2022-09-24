import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import styled from 'styled-components/native'

import type { Screens } from '@online-library/core'
import { navigationRef } from '@online-library/core'

import { theme } from '@online-library/ui'

import { Text } from 'components/common'

import { HomeScreen, LoginScreen, RegistrationScreen } from './screens'

const Tab = createBottomTabNavigator<Screens>()

export const App = () => {
   useEffect(() => SplashScreen.hide(), [])
   return (
      <AppContainer>
         <NavigationContainer ref={navigationRef}>
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
            </Tab.Navigator>
         </NavigationContainer>
      </AppContainer>
   )
}

const AppContainer = styled.View`
   flex: 1;
`

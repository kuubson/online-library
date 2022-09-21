import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import styled from 'styled-components/native'

import { HomeScreen } from './screens'

const Stack = createNativeStackNavigator()

export const App = () => (
   <AppContainer>
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
         </Stack.Navigator>
      </NavigationContainer>
   </AppContainer>
)

const AppContainer = styled.View`
   flex: 1;
`

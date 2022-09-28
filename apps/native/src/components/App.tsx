import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import styled from 'styled-components/native'

import { navigationRef } from '@online-library/core'

import { Screens } from './Screens'

export const App = () => {
   useEffect(() => SplashScreen.hide(), [])
   return (
      <AppContainer>
         <NavigationContainer ref={navigationRef}>
            <Screens />
         </NavigationContainer>
      </AppContainer>
   )
}

const AppContainer = styled.View`
   flex: 1;
`

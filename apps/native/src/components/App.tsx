import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import styled from 'styled-components/native'

import { customAxios, navigationRef } from '@online-library/core'

import { SERVER_NATIVE_URL } from 'config'

import { Screens } from './screens'
import { Providers } from './shared'

axios.defaults.baseURL = SERVER_NATIVE_URL

customAxios.defaults.baseURL = SERVER_NATIVE_URL

export const App = () => {
   useEffect(() => SplashScreen.hide(), [])
   return (
      <Providers>
         <AppContainer>
            <NavigationContainer ref={navigationRef}>
               <Screens />
            </NavigationContainer>
         </AppContainer>
      </Providers>
   )
}

const AppContainer = styled.View`
   flex: 1;
`

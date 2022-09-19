import React, { useEffect } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

import { API } from '@online-library/tools'

export const App = () => {
   useEffect(() => {
      console.log(API)
   }, [])
   return (
      <AppContainer>
         <Text>Online Library</Text>
      </AppContainer>
   )
}

const AppContainer = styled.View``

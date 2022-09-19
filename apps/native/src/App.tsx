import React, { useEffect } from 'react'
import styled from 'styled-components'

import { API } from '@online-library/tools'

export const App = () => {
   useEffect(() => {
      console.log(API)
   }, [])
   return <AppContainer></AppContainer>
}

const AppContainer = styled.div``

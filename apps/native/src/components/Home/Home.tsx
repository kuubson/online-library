import React from 'react'
import styled from 'styled-components/native'

import { Text } from 'components/common'

export const Home = () => (
   <HomeContainer>
      <Text>Online Library</Text>
   </HomeContainer>
)

const HomeContainer = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
`

import React from 'react'
import styled from 'styled-components/native'

import { navigate } from '@online-library/core'

import * as Styled from './styled'
import { ButtonText } from 'components/shared/styled'

export const Home = () => (
   <HomeContainer>
      <Styled.Header>Online Library</Styled.Header>
      <Styled.Buttons>
         <Styled.Button onPress={() => navigate('Login')}>
            <ButtonText>Login</ButtonText>
         </Styled.Button>
         <Styled.Button onPress={() => navigate('Registration')} noMargin>
            <ButtonText>Register</ButtonText>
         </Styled.Button>
      </Styled.Buttons>
   </HomeContainer>
)

const HomeContainer = styled.View`
   flex: 1;
   justify-content: space-around;
   align-items: center;
`

import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import * as Styled from './styled'

export const Home = () => {
   const navigation = useNavigation()
   return (
      <HomeContainer>
         <Styled.Header>Online Library</Styled.Header>
         <Styled.Buttons>
            <Styled.Button onPress={() => navigation.navigate('Login')}>
               <Styled.ButtonText>Login</Styled.ButtonText>
            </Styled.Button>
            <Styled.Button onPress={() => navigation.navigate('Registration')} noMargin>
               <Styled.ButtonText>Register</Styled.ButtonText>
            </Styled.Button>
         </Styled.Buttons>
      </HomeContainer>
   )
}

const HomeContainer = styled.View`
   flex: 1;
   justify-content: space-around;
   align-items: center;
`

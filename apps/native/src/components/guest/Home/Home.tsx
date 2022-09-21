import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import * as Styled from './styled'
import { ButtonText } from 'components/shared/styled'

export const Home = () => {
   const navigation = useNavigation()
   return (
      <HomeContainer>
         <Styled.Header>Online Library</Styled.Header>
         <Styled.Buttons>
            <Styled.Button onPress={() => navigation.navigate('Login')}>
               <ButtonText>Login</ButtonText>
            </Styled.Button>
            <Styled.Button onPress={() => navigation.navigate('Registration')} noMargin>
               <ButtonText>Register</ButtonText>
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

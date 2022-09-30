import React from 'react'
import styled from 'styled-components/native'

import { navigate, t } from '@online-library/core'

import * as Styled from './styled'
import { Text } from 'components/shared/styled'

export const Home = () => (
   <HomeContainer>
      <Styled.Header>Online Library</Styled.Header>
      <Styled.Buttons>
         <Styled.Button onPress={() => navigate('Login')}>
            <Text>{t('buttons.login')}</Text>
         </Styled.Button>
         <Styled.Button onPress={() => navigate('Registration')} noMargin>
            <Text>{t('buttons.register')}</Text>
         </Styled.Button>
      </Styled.Buttons>
   </HomeContainer>
)

const HomeContainer = styled.View`
   flex: 1;
   justify-content: space-around;
   align-items: center;
`

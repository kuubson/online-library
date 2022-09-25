import React from 'react'
import styled from 'styled-components/native'

import { useApiFeedback } from '@online-library/core'

import * as Styled from './styled'
import { AbsoluteContainer, Submit, Text } from 'components/shared/styled'

export const ApiFeedback = () => {
   const { header, message, buttonText, callback, resetApiFeedback } = useApiFeedback()
   return (
      <ApiFeedbackContainer>
         <Styled.ScrollView
            contentContainerStyle={{
               flexGrow: 1,
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Styled.HeaderContainer>
               <Styled.Header>{header}</Styled.Header>
               <Styled.Message>{message}</Styled.Message>
            </Styled.HeaderContainer>
            <Submit
               onPress={() => {
                  resetApiFeedback()
                  callback()
               }}
               noMargin
            >
               <Text>{buttonText}</Text>
            </Submit>
         </Styled.ScrollView>
      </ApiFeedbackContainer>
   )
}

const ApiFeedbackContainer = styled(AbsoluteContainer)`
   z-index: 3;
   elevation: 3;
`

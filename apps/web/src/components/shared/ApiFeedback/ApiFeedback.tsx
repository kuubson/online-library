import styled from 'styled-components/macro'

import { useApiFeedback } from '@online-library/core'

import { fadeIn } from 'assets/animations'

import * as Styled from './styled'

import { LoaderContainer } from 'components/common/Loader/Loader'

export const ApiFeedback = () => {
   const { header, message, buttonText, callback, resetApiFeedback } = useApiFeedback()

   const handleOnClick = () => {
      callback()
      resetApiFeedback()
   }

   return (
      <ApiFeedbackContainer>
         <Styled.HeaderContainer>
            <Styled.Header>{header}</Styled.Header>
            <Styled.Message>{message}</Styled.Message>
         </Styled.HeaderContainer>
         <Styled.Button onClick={handleOnClick}>{buttonText}</Styled.Button>
      </ApiFeedbackContainer>
   )
}

const ApiFeedbackContainer = styled(LoaderContainer)`
   flex-direction: column;
   animation: ${fadeIn} 0.5s ease-in-out;
   z-index: 6;
`

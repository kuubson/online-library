import styled from 'styled-components/macro'

import { fadeIn } from 'assets/animations'

import * as Styled from './styled'

import { LoaderContainer } from 'components/shared/Loader/Loader'

import { useApiFeedback } from 'hooks'

import { setApiFeedback } from 'helpers'

export const ApiFeedback = () => {
   const { header, message, buttonText, callback } = useApiFeedback()

   const handleOnClick = () => {
      callback()
      setApiFeedback('', '', '')
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

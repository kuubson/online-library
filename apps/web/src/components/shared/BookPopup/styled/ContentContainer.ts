import styled, { css } from 'styled-components'

import { queries } from 'styles'

type StyledProps = {
   withLessHeight?: boolean
   isKeyboardOpened?: boolean
   withFlips?: boolean
}

export const ContentContainer = styled.div<StyledProps>`
   width: 60%;
   height: 70%;
   background: white;
   padding: 18px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   @media (max-width: 1150px) {
      width: 55%;
      height: 80%;
      flex-direction: column;
   }
   @media ${queries.smallDesktop} {
      width: 80%;
      height: 80%;
   }
   @media ${queries.tablet} {
      width: 90%;
      height: 90%;
   }
   ${({ withLessHeight }) =>
      withLessHeight
         ? css`
              height: 50% !important;
              @media ${queries.tablet} {
                 height: 60% !important;
              }
           `
         : null};
   ${({ isKeyboardOpened }) =>
      isKeyboardOpened
         ? css`
              height: 80% !important;
              @media ${queries.tablet} {
                 height: 80% !important;
              }
           `
         : null};
   ${({ withFlips }) =>
      withFlips
         ? css`
              background: none;
              justify-content: center;
              align-items: center;
              flex-direction: column;
           `
         : null};
`

import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

type StyledProps = {
   withCurrentUser: boolean
   withLastUserMessage: boolean
}

export const ContentContainer = styled.View<StyledProps>`
   padding: ${moderateScale(8)}px ${moderateScale(10)}px;
   margin-bottom: ${moderateScale(10)}px;
   font-size: ${moderateScale(15)}px;
   border-radius: ${moderateScale(12)}px;
   color: white;
   background: rgba(0, 136, 255, 0.4);
   position: relative;
   @media (max-width: 1000px) {
      font-size: ${moderateScale(14)}px;
   }
   @media (max-width: 700px) {
      font-size: ${moderateScale(13)}px;
   }
   ${({ withCurrentUser }) =>
      withCurrentUser
         ? css`
              align-self: flex-end;
           `
         : null}
   ${({ withCurrentUser, withLastUserMessage }) =>
      withLastUserMessage &&
      (withCurrentUser
         ? css`
              border-bottom-left-radius: ${moderateScale(2)}px;
           `
         : css`
              border-bottom-right-radius: ${moderateScale(2)}px;
           `)}
`

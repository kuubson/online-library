import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

type StyledProps = {
   withCurrentUser: boolean
}

export const AvatarContainer = styled.View<StyledProps>`
   width: ${moderateScale(30)}px;
   height: ${moderateScale(30)}px;
   border-radius: ${moderateScale(15)}px;
   background: white;
   margin-left: ${moderateScale(15)}px;
   justify-content: center;
   align-items: center;
   position: absolute;
   bottom: -${moderateScale(2)}px;
   right: -${moderateScale(40)}px;
   ${({ withCurrentUser }) =>
      withCurrentUser
         ? css`
              left: -${moderateScale(55)}px;
           `
         : null}
`

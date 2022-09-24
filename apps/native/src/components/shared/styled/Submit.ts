import styled from 'styled-components/native'

import { theme } from '@online-library/ui'

import { scale } from 'styles'

type StyledProps = {
   noMargin?: boolean
   withFacebook?: boolean
}

export const Submit = styled.TouchableOpacity<StyledProps>`
   width: 50%;
   min-height: ${scale(50)}px;
   padding: ${scale(10)}px ${scale(20)}px;
   background: ${({ withFacebook }) => (withFacebook ? theme.colors.fb : 'transparent')};
   margin-bottom: ${({ noMargin }) => (noMargin ? 0 : scale(25))}px;
   border-width: ${({ withFacebook }) => (withFacebook ? 0 : scale(2))}px;
   border-radius: ${({ withFacebook }) => (withFacebook ? scale(5) : 0)}px;
   border-color: white;
   justify-content: center;
   align-items: center;
   align-self: center;
`

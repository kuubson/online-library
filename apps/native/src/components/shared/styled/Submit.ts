import styled from 'styled-components/native'

import { theme } from '@online-library/core'

import { moderateScale } from 'styles'

import { Button } from './Button'

type StyledProps = {
   withFacebook?: boolean
}

export const Submit = styled(Button)<StyledProps>`
   background: ${({ withFacebook }) => (withFacebook ? theme.colors.fb : 'transparent')};
   border-width: ${({ withFacebook }) => (withFacebook ? 0 : moderateScale(2))}px;
   border-radius: ${({ withFacebook }) => (withFacebook ? moderateScale(5) : 0)}px;
   border-color: white;
   align-self: center;
`

import styled from 'styled-components/native'

import { moderateScale } from 'styles'

type StyledProps = {
   noMargin?: boolean
}

export const Button = styled.TouchableOpacity<StyledProps>`
   width: 60%;
   min-height: ${moderateScale(50)}px;
   padding: ${moderateScale(10)}px ${moderateScale(20)}px;
   margin-bottom: ${({ noMargin }) => (noMargin ? 0 : moderateScale(25))}px;
   justify-content: center;
   align-items: center;
`

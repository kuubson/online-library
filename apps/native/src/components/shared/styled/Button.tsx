import styled from 'styled-components/native'

import { scale } from 'styles'

type StyledProps = {
   noMargin?: boolean
}

export const Button = styled.TouchableOpacity<StyledProps>`
   width: 60%;
   min-height: ${scale(50)}px;
   padding: ${scale(10)}px ${scale(20)}px;
   margin-bottom: ${({ noMargin }) => (noMargin ? 0 : scale(25))}px;
   justify-content: center;
   align-items: center;
`

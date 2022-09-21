import styled from 'styled-components/native'

import { scale } from 'styles'

type StyledProps = {
   noMargin: boolean
}

export const Button = styled.TouchableOpacity<StyledProps>`
   width: 50%;
   height: ${scale(55)}px;
   background: #333333;
   margin-bottom: ${({ noMargin }) => (noMargin ? 0 : scale(25))}px;
   border-right-width: ${scale(2)}px;
   border-right-color: white;
   border-left-width: ${scale(2)}px;
   border-left-color: white;
   justify-content: center;
   align-items: center;
`

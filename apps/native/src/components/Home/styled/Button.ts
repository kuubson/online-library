import styled from 'styled-components/native'

import { scale } from 'styles'

export const Button = styled.TouchableOpacity`
   padding: ${scale(15)}px ${scale(40)}px;
   background: #333;
   border-right-width: ${scale(2)}px;
   border-right-color: white;
   border-left-width: ${scale(2)}px;
   border-left-color: white;
   justify-content: center;
   align-items: center;
`

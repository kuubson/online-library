import styled from 'styled-components/native'

import { scale } from 'styles'

export const LoadMoreButton = styled.TouchableOpacity`
   width: 50%;
   height: ${scale(50)}px;
   border-color: white;
   border-width: ${scale(2)}px;
   border-radius: ${scale(10)}px;
   margin-top: ${scale(35)}px;
   justify-content: center;
   align-items: center;
   align-self: center;
`

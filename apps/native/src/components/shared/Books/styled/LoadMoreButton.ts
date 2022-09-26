import styled from 'styled-components/native'

import { moderateScale } from 'styles'

export const LoadMoreButton = styled.TouchableOpacity`
   width: 50%;
   height: ${moderateScale(50)}px;
   border-color: white;
   border-width: ${moderateScale(2)}px;
   border-radius: ${moderateScale(10)}px;
   margin-top: ${moderateScale(10)}px;
   justify-content: center;
   align-items: center;
   align-self: center;
`

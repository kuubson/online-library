import styled from 'styled-components/native'

import { moderateScale } from 'styles'

export const Button = styled.TouchableOpacity`
   width: ${moderateScale(70)}px;
   height: ${moderateScale(70)}px;
   background: rgba(0, 136, 255, 0.6);
   padding-right: ${moderateScale(3)}px;
   padding-bottom: ${moderateScale(2)}px;
   border-radius: ${moderateScale(35)}px;
   justify-content: center;
   align-items: center;
`

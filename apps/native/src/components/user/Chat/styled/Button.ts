import styled from 'styled-components/native'

import { moderateScale } from 'styles'

export const Button = styled.TouchableOpacity`
   background: #333;
   padding: ${moderateScale(5)}px ${moderateScale(15)}px;
   margin-top: ${moderateScale(5)}px;
   border-radius: ${moderateScale(10)}px;
   margin-top: 0px;
`

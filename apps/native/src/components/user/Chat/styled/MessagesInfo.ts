import styled from 'styled-components/native'

import { moderateScale } from 'styles'

export const MessagesInfo = styled.TouchableOpacity`
   padding: ${moderateScale(10)}px;
   background: rgba(0, 136, 255, 0.4);
   box-shadow: 0px 0px ${moderateScale(10)}px black;
   border-radius: ${moderateScale(20)}px;
   position: absolute;
   top: ${moderateScale(15)}px;
   align-self: center;
   elevation: 1;
   z-index: 1;
`

import styled from 'styled-components/native'

import { moderateScale } from 'styles'

export const TextareaContainer = styled.View`
   height: ${moderateScale(70)}px;
   background: rgba(0, 136, 255, 0.8);
   padding-right: 10px;
   margin: 0px ${moderateScale(10)}px ${moderateScale(15)}px ${moderateScale(10)}px;
   border-radius: ${moderateScale(10)}px;
   justify-content: space-around;
   flex-direction: row;
`

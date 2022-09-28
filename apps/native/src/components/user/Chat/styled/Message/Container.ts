import styled from 'styled-components/native'

import { moderateScale } from 'styles'

export const Container = styled.View`
   margin-bottom: ${moderateScale(10)}px;
   border-radius: ${moderateScale(12)}px;
   background: rgba(0, 136, 255, 0.2);
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
`

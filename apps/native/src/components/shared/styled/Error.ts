import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from './Text'

export const Error = styled(Text)`
   color: red;
   font-size: ${moderateScale(12)}px;
   margin-top: ${moderateScale(10)}px;
   text-align: left;
`

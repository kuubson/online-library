import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from './Text'

export const Warning = styled(Text)`
   max-width: 80%;
   font-size: ${moderateScale(18)}px;
`

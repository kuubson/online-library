import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

export const Switcher = styled(Text)`
   font-size: ${moderateScale(12)}px;
   padding: ${moderateScale(8)}px ${moderateScale(20)}px;
   background: white;
   color: black;
`

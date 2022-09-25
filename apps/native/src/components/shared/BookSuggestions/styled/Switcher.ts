import styled from 'styled-components/native'

import { scale } from 'styles'

import { Text } from 'components/shared/styled'

export const Switcher = styled(Text)`
   font-size: ${scale(12)}px;
   padding: ${scale(8)}px ${scale(20)}px;
   background: white;
   color: black;
`

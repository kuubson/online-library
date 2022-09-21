import styled from 'styled-components/native'

import { scale } from 'styles'

import { Text } from 'components/common'

export const Error = styled(Text)`
   color: red;
   font-size: ${scale(12)}px;
   margin-top: ${scale(10)}px;
`

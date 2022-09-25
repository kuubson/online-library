import styled from 'styled-components/native'

import { scale } from 'styles'

import { Text } from 'components/shared/styled'

export const Message = styled(Text)`
   text-align: center;
   line-height: ${scale(30)}px;
`

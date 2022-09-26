import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

export const Message = styled(Text)`
   max-width: 80%;
   text-align: center;
   line-height: ${moderateScale(30)}px;
`

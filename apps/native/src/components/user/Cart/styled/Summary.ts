import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

type SummaryProps = {
   last: boolean
}

export const Summary = styled(Text)<SummaryProps>`
   max-width: 80%;
   margin-bottom: ${({ last }) => (last ? moderateScale(35) : moderateScale(15))}px;
`

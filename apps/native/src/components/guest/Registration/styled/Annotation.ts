import styled from 'styled-components/native'

import { scale } from 'styles'

import { Text } from 'components/common'

type StyledProps = {
   noMargin: boolean
}

export const Annotation = styled(Text)<StyledProps>`
   text-align: center;
   font-size: ${scale(15)}px;
   margin-bottom: ${({ noMargin }) => (noMargin ? 0 : scale(25))}px;
`

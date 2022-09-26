import styled from 'styled-components/native'

import { scale } from 'styles'

import { Text } from 'components/shared/styled'

type StyledProps = {
   withTitle: boolean
}

export const Annotation = styled(Text)<StyledProps>`
   font-size: ${({ withTitle }) => (withTitle ? scale(15) : scale(18))}px;
   padding: ${scale(8)}px ${scale(10)}px;
   text-align: center;
`

import styled from 'styled-components/native'

import { scale } from 'styles'

import { Text } from 'components/shared/styled'

type StyledProps = {
   withTitle: boolean
}

export const Annotation = styled(Text)<StyledProps>`
   font-size: ${({ withTitle }) => (withTitle ? scale(15) : scale(18))}px;
   margin-top: ${({ withTitle }) => (withTitle ? scale(5) : 0)}px;
   text-align: center;
`

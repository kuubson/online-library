import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

type StyledProps = {
   withTitle: boolean
}

export const Annotation = styled(Text)<StyledProps>`
   font-size: ${({ withTitle }) => (withTitle ? moderateScale(15) : moderateScale(18))}px;
   padding: ${moderateScale(8)}px ${moderateScale(10)}px;
   text-align: center;
`

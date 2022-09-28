import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

type StyledProps = {
   noMargin: boolean
}

export const Annotation = styled(Text)<StyledProps>`
   text-align: center;
   font-size: ${moderateScale(15)}px;
   margin-bottom: ${({ noMargin }) => (noMargin ? 0 : moderateScale(25))}px;
`

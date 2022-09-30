import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { scalableDimension } from 'utils'

export const Image = styled.Image`
   width: ${scalableDimension - moderateScale(40)}px;
   height: ${scalableDimension}px;
`

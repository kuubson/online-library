import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Button as _Button } from 'components/shared/styled'

export const Button = styled(_Button)`
   background: #333333;
   border-right-width: ${moderateScale(2)}px;
   border-right-color: white;
   border-left-width: ${moderateScale(2)}px;
   border-left-color: white;
`

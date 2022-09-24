import styled from 'styled-components/native'

import { scale } from 'styles'

import { Button as _Button } from 'components/shared/styled'

export const Button = styled(_Button)`
   background: #333333;
   border-right-width: ${scale(2)}px;
   border-right-color: white;
   border-left-width: ${scale(2)}px;
   border-left-color: white;
`

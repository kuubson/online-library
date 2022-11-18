import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from './Text'

type StyledProps = {
   black?: boolean
}

export const Header = styled(Text)<StyledProps>`
   text-align: center;
   color: white;
   font-size: ${moderateScale(17)}px;
   margin-bottom: ${moderateScale(30)}px;
   ${({ black }) =>
      black
         ? css`
              color: black;
              margin-bottom: ${moderateScale(10)}px;
           `
         : null}
`

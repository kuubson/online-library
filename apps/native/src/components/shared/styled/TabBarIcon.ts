import styled, { css } from 'styled-components/native'

import { Text } from './Text'

type StyledProps = {
   isFocused: boolean
}

export const TabBarIcon = styled(Text)<StyledProps>`
   width: 100px;
   ${({ isFocused }) =>
      isFocused
         ? css`
              font-weight: bold;
           `
         : null}
`

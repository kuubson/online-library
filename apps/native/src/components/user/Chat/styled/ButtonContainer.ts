import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

type StyledProps = {
   withMarginRight?: boolean
}

export const ButtonContainer = styled.View<StyledProps>`
   align-self: center;
   ${({ withMarginRight }) =>
      withMarginRight
         ? css`
              margin-right: ${moderateScale(8)}px;
           `
         : null}
`

import styled, { css } from 'styled-components/macro'

import { queries } from 'styles'

type StyledProps = {
   withBooksSuggestions?: boolean
}

export const Input = styled.input<StyledProps>`
   width: 100%;
   font-size: 13px;
   padding-bottom: 12px;
   border-bottom: 1.5px solid white;
   text-align: 2px;
   ::placeholder {
      color: white;
   }
   @media ${queries.desktop} {
      font-size: 12px;
   }
   @media ${queries.smallTablet} {
      font-size: 11px;
   }
   ${({ withBooksSuggestions }) =>
      withBooksSuggestions
         ? css`
              padding-right: 110px;
           `
         : null}
`

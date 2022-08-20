import styled, { css } from 'styled-components'

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
   @media (max-width: 1000px) {
      font-size: 12px;
   }
   @media (max-width: 500px) {
      font-size: 11px;
   }
   ${({ withBooksSuggestions }) =>
      withBooksSuggestions
         ? css`
              padding-right: 110px;
           `
         : null}
`

import styled, { css } from 'styled-components/macro'

type StyledProps = {
   shouldMenuExpand?: boolean
}

export const LinesContainer = styled.div<StyledProps>`
   display: none;
   cursor: pointer;
   position: relative;
   transition: 0.5s ease-in-out;
   @media (max-width: 800px) {
      display: block;
   }
   ${({ shouldMenuExpand }) =>
      shouldMenuExpand
         ? css`
              transform: rotate(45deg);
           `
         : null}
`

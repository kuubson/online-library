import styled, { css } from 'styled-components/macro'

import { queries } from 'styles'

type StyledProps = {
   withTitle?: boolean
}

export const Annotation = styled.p<StyledProps>`
   width: 150px;
   font-size: 15px;
   font-weight: bold;
   line-height: 1.5;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   text-shadow: -1px 0px black;
   @media ${queries.smallDesktop} {
      font-size: 14px;
   }
   @media ${queries.tablet} {
      font-size: 13px;
   }
   ${({ withTitle }) =>
      withTitle
         ? css`
              top: 60px;
              font-weight: initial;
              font-size: 13px;
              margin-top: 10px;
              @media ${queries.smallDesktop} {
                 font-size: 12px;
              }
              @media ${queries.tablet} {
                 font-size: 11px;
              }
           `
         : null}
`

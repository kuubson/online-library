import styled, { css } from 'styled-components/macro'

import { queries } from 'styles'

type StyledProps = {
   withMoreMarginBottom?: boolean
   withPaddingRight?: boolean
   black?: boolean
}

export const Header = styled.h2<StyledProps>`
   white-space: nowrap;
   font-size: 22px;
   line-height: 1.5;
   font-weight: bold;
   @media ${queries.largeDesktop} {
      font-size: 20px;
   }
   @media ${queries.smallDesktop} {
      font-size: 18px;
   }
   @media ${queries.tablet} {
      font-size: 16px;
   }
   ${({ withMoreMarginBottom }) =>
      withMoreMarginBottom
         ? css`
              @media ${queries.mediumDesktop} {
                 margin-bottom: 20px;
              }
           `
         : null};
   ${({ withPaddingRight }) =>
      withPaddingRight
         ? css`
              padding-right: 30px;
              @media ${queries.mediumDesktop} {
                 padding-right: 0px;
              }
           `
         : null};
   ${({ black }) =>
      black
         ? css`
              color: black;
              padding-right: 0px;
              white-space: pre-line;
              font-size: 18px;
              font-weight: initial;
              @media ${queries.largeDesktop} {
                 font-size: 17px;
              }
              @media ${queries.smallDesktop} {
                 font-size: 16px;
              }
              @media ${queries.tablet} {
                 font-size: 15px;
              }
           `
         : null};
`

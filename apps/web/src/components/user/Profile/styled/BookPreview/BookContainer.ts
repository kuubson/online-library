import styled, { css } from 'styled-components/macro'

import { queries } from 'styles'

type StyledProps = {
   withFlips?: boolean
   read?: boolean
}

export const BookContainer = styled.div<StyledProps>`
   width: 400px;
   height: 400px;
   perspective: 1000px;
   transition: transform 1s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out;
   @media ${queries.mediumTablet} {
      width: 350px;
      height: 300px;
   }
   @media ${queries.smallTablet} {
      width: 250px;
   }
   ${({ withFlips }) =>
      withFlips
         ? css`
              transform: translateX(50%);
              width: 450px;
              @media ${queries.desktop} {
                 width: 90%;
              }
              @media ${queries.smallDesktop} {
                 width: 60%;
              }
              @media ${queries.mediumTablet} {
                 width: 60%;
              }
              @media ${queries.tablet} {
                 width: 55%;
              }
           `
         : null};
   ${({ read }) =>
      read
         ? css`
              transform: translateX(100%);
              @media ${queries.mediumTablet} {
                 width: 350px;
                 height: 300px;
              }
              @media ${queries.smallTablet} {
                 width: 250px;
              }
           `
         : null};
`

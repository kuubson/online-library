import styled, { css } from 'styled-components/macro'

import { queries } from 'styles'

type StyledProps = {
   withLessMarginTop?: boolean
   withFacebook?: boolean
}

export const Submit = styled.button<StyledProps>`
   font-size: 14px;
   padding: 10px 40px;
   margin: 45px auto 0px auto;
   border: 1.5px solid white;
   transition: transform 0.3s ease-in-out;
   :hover {
      transform: scale(1.03);
   }
   :last-of-type {
      margin: 30px auto 0px auto;
   }
   :first-of-type {
      margin: 45px auto 0px auto;
   }
   @media ${queries.desktop} {
      font-size: 13px;
   }
   @media ${queries.smallTablet} {
      font-size: 12px;
   }
   ${({ withLessMarginTop }) =>
      withLessMarginTop
         ? css`
              margin: 35px auto 0px auto !important;
           `
         : null};
   ${({ withFacebook }) =>
      withFacebook
         ? css`
              background: ${({ theme }) => theme.facebookColor};
              border: none;
              border-radius: 5px;
           `
         : null}
`

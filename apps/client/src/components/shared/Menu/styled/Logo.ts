import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Logo = styled.h1`
   font-size: 36px;
   font-weight: bold;
   text-align: left;
   @media ${queries.largeDesktop} {
      font-size: 32px;
   }
   @media ${queries.desktop} {
      font-size: 28px;
   }
   @media ${queries.largeTablet} {
      font-size: 24px;
   }
`

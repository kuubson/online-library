import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Image = styled.img`
   width: 300px;
   @media (max-width: 1500px) {
      width: 260px;
   }
   @media ${queries.desktop} {
      width: 230px;
   }
   @media ${queries.largeTablet} {
      display: none;
   }
`

import styled from 'styled-components'

import { queries } from 'styles'

export const Error = styled.p`
   color: red;
   font-size: 12px;
   margin-top: 10px;
   text-align: left;
   font-weight: bold;
   &::first-letter {
      text-transform: capitalize;
   }
   @media ${queries.desktop} {
      font-size: 11px;
   }
   @media ${queries.smallTablet} {
      font-size: 10px;
   }
`

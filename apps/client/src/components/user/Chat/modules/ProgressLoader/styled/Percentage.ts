import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Percentage = styled.p`
   font-size: 12px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   @media ${queries.largeTablet} {
      font-size: 9px;
   }
`

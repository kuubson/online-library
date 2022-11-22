import styled from 'styled-components'

import { queries } from 'styles'

export const Annotation = styled.p`
   font-size: 13px;
   font-weight: bold;
   margin-bottom: 25px;
   padding: 0px 20%;
   line-height: 1.5;
   cursor: pointer;
   @media ${queries.desktop} {
      font-size: 12px;
   }
   @media ${queries.smallTablet} {
      font-size: 11px;
   }
   :last-of-type {
      margin-bottom: 0px;
   }
`

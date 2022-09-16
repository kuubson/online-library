import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Label = styled.label`
   font-size: 14px;
   margin-bottom: 12px;
   font-weight: bold;
   @media ${queries.desktop} {
      font-size: 13px;
   }
   @media ${queries.smallTablet} {
      font-size: 12px;
   }
`

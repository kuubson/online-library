import styled from 'styled-components'

import { queries } from 'styles'

export const SummaryContainer = styled.div`
   width: 45%;
   margin-top: 20px;
   @media ${queries.largeTablet} {
      width: 100%;
      margin-top: 35px;
      margin-bottom: 15px;
   }
`

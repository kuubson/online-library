import styled from 'styled-components'

import { queries } from 'styles'

export const Warning = styled.p`
   max-width: 280px;
   margin: 0px auto;
   font-size: 18px;
   line-height: 1.5;
   @media ${queries.largeDesktop} {
      font-size: 17px;
   }
   @media ${queries.smallDesktop} {
      font-size: 16px;
   }
   @media ${queries.tablet} {
      max-width: 250px;
      font-size: 15px;
   }
`

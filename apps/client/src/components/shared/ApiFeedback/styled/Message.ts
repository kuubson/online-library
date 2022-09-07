import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Message = styled.p`
   width: 500px;
   margin: 50px auto 0px auto;
   font-size: 17px;
   line-height: 1.5;
   @media ${queries.largeDesktop} {
      font-size: 15px;
   }
   @media ${queries.mediumDesktop} {
      font-size: 13px;
   }
   @media ${queries.largeTablet} {
      width: 80%;
   }
`

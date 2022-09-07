import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Book = styled.li`
   font-size: 15px;
   margin-bottom: 25px;
   :last-of-type {
      margin-bottom: 0px;
   }
   @media ${queries.largeDesktop} {
      font-size: 14px;
   }
   @media ${queries.smallDesktop} {
      font-size: 13px;
   }
   @media ${queries.tablet} {
      font-size: 12px;
   }
`

import styled from 'styled-components'

import { queries } from 'styles'

export const Suggestion = styled.li`
   color: black;
   padding: 15px;
   font-weight: bold;
   font-size: 14px;
   cursor: pointer;
   @media ${queries.largeDesktop} {
      font-size: 13px;
   }
   @media ${queries.smallDesktop} {
      font-size: 12px;
   }
   @media ${queries.tablet} {
      font-size: 11px;
   }
`

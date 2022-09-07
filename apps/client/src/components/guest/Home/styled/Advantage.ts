import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Advantage = styled.li`
   font-size: 20px;
   font-weight: bold;
   @media ${queries.largeDesktop} {
      font-size: 18px;
   }
   @media ${queries.mediumDesktop} {
      font-size: 16px;
   }
`

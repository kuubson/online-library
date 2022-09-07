import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Header = styled.h2`
   font-size: 22px;
   font-weight: bold;
   @media ${queries.largeDesktop} {
      font-size: 20px;
   }
   @media ${queries.mediumDesktop} {
      font-size: 18px;
   }
`

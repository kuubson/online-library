import styled from 'styled-components'

import { queries } from 'styles'

export const Header = styled.h1.attrs({ 'data-cy': 'header' })`
   font-size: 45px;
   font-weight: bold;
   @media ${queries.largeDesktop} {
      font-size: 40px;
   }
   @media ${queries.mediumDesktop} {
      font-size: 35px;
   }
`

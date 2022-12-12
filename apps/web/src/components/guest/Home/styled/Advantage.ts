import styled from 'styled-components'

import { queries } from 'styles'

export const Advantage = styled.li.attrs({ 'data-cy': 'advantage' })`
   font-size: 20px;
   font-weight: bold;
   @media ${queries.largeDesktop} {
      font-size: 18px;
   }
   @media ${queries.mediumDesktop} {
      font-size: 16px;
   }
`

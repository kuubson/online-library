import styled from 'styled-components'

import { queries } from 'styles'

export const Image = styled.img.attrs({ 'data-cy': 'image' })`
   width: 280px;
   @media (max-width: 1500px) {
      width: 260px;
   }
   @media ${queries.desktop} {
      width: 230px;
   }
   @media ${queries.largeTablet} {
      display: none;
   }
`

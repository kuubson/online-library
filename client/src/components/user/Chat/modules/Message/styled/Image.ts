import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Image = styled.img`
   max-width: 100%;
   height: 350px;
   border: 1px solid black;
   border-radius: 10px;
   @media ${queries.desktop} {
      max-width: 75vw;
      height: 35vh;
   }
`

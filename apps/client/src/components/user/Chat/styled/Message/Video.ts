import styled from 'styled-components'

import { queries } from 'styles'

export const Video = styled.video`
   max-width: 100%;
   height: 400px;
   border: 1px solid black;
   border-radius: 10px;
   @media ${queries.desktop} {
      max-width: 75vw;
      height: 50vh;
   }
`

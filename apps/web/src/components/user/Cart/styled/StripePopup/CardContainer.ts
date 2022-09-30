import styled from 'styled-components/macro'

import { queries } from 'styles'

export const CardContainer = styled.div`
   width: 80%;
   border: 1px solid black;
   padding: 10px;
   @media ${queries.tablet} {
      width: 100%;
   }
`

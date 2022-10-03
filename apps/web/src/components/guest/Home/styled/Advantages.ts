import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Advantages = styled.ul`
   height: 50%;
   display: flex;
   justify-content: space-around;
   flex-direction: column;
   flex: 1;
   @media ${queries.smallDesktop} {
      display: none;
   }
`

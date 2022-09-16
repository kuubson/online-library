import styled from 'styled-components/macro'

import { queries } from 'styles'

export const AdvantagesContainer = styled.ul`
   height: 100%;
   padding: 30px 0px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   flex-direction: column;
   @media ${queries.smallDesktop} {
      display: none;
   }
`

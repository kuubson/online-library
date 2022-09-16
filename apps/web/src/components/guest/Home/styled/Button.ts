import styled from 'styled-components/macro'

import { queries } from 'styles'

export const Button = styled.button`
   width: 200px;
   padding: 15px 0px;
   font-size: 14px;
   background: #333;
   border-right: 2px solid white;
   border-left: 2px solid white;
   transition: transform 0.3s ease-in-out;
   :hover {
      transform: scale(1.03);
   }
   :last-of-type {
      margin-top: 15px;
   }
   @media ${queries.largeDesktop} {
      font-size: 13px;
   }
   @media ${queries.mediumDesktop} {
      width: 180px;
      font-size: 12px;
   }
`

import styled from 'styled-components/macro'

export const Percentage = styled.p`
   font-size: 12px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   @media (max-width: 800px) {
      font-size: 9px;
   }
`

import styled from 'styled-components/macro'

export const Warning = styled.p`
   max-width: 280px;
   margin: 0px auto;
   font-size: 18px;
   line-height: 1.5;
   @media (max-width: 1200px) {
      font-size: 17px;
   }
   @media (max-width: 900px) {
      font-size: 16px;
   }
   @media (max-width: 600px) {
      max-width: 250px;
      font-size: 15px;
   }
`

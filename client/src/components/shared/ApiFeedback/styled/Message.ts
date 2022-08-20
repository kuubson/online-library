import styled from 'styled-components'

export const Message = styled.p`
   width: 500px;
   margin: 50px auto 0px auto;
   font-size: 17px;
   line-height: 1.5;
   @media (max-width: 1200px) {
      font-size: 15px;
   }
   @media (max-width: 1100px) {
      font-size: 13px;
   }
   @media (max-width: 800px) {
      width: 80%;
   }
`

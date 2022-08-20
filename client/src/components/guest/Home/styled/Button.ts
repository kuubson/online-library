import styled from 'styled-components'

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
   @media (max-width: 1200px) {
      font-size: 13px;
   }
   @media (max-width: 1100px) {
      width: 180px;
      font-size: 12px;
   }
`

import styled from 'styled-components/macro'

export const PayPalButton = styled.button`
   background: ${({ theme }) => theme.payPalColor};
   border-radius: 15px;
   font-size: 14px;
   margin: 25px auto 0px auto;
   padding: 8px 15px;
   font-weight: bold;
   letter-spacing: 1px;
   color: black;
   transition: transform 0.3s ease-in-out;
   :hover {
      transform: scale(1.03);
   }
   @media (max-width: 1000px) {
      font-size: 13px;
   }
   @media (max-width: 500px) {
      font-size: 12px;
   }
`

import styled from 'styled-components'

export const Annotation = styled.p`
   font-size: 13px;
   font-weight: bold;
   margin-bottom: 25px;
   padding: 0px 20%;
   line-height: 1.5;
   cursor: pointer;
   @media (max-width: 1000px) {
      font-size: 12px;
   }
   @media (max-width: 500px) {
      font-size: 11px;
   }
   :last-of-type {
      margin-bottom: 0px;
   }
`

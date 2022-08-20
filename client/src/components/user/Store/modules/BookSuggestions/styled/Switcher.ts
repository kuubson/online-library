import styled from 'styled-components'

export const Switcher = styled.button`
   width: 100px;
   font-size: 11px;
   color: black;
   padding: 6px 0px;
   white-space: nowrap;
   background: white;
   position: absolute;
   bottom: 10px;
   right: 0px;
   :hover {
      transform: none;
   }
   @media (max-width: 1000px) {
      font-size: 10px;
   }
   @media (max-width: 500px) {
      font-size: 9px;
      padding: 6px 16px;
   }
`

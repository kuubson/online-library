import styled from 'styled-components/macro'

import { fadeIn } from 'assets/animations'

export const PopupContainer = styled.div`
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.6);
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   animation: ${fadeIn} 0.5s ease-in-out;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 4;
`

import styled, { keyframes } from 'styled-components/macro'

const dotAnimation = keyframes`
    80%, 100% { 
        transform: rotate(360deg);
    } 
`

const dotBeforeAnimation = keyframes`
    50% {
        transform: scale(0.4); 
    }
    100%, 0% {
        transform: scale(1.0); 
    } 
`

export const Dot = styled.span`
   width: 100%;
   height: 100%;
   animation: ${dotAnimation} 2s infinite ease-in-out both;
   position: absolute;
   left: 0px;
   top: 0px;
   ::before {
      width: 25%;
      height: 25%;
      content: '';
      display: block;
      background-color: white;
      border-radius: 100%;
      animation: ${dotBeforeAnimation} 2s infinite ease-in-out both;
   }
   :nth-child(1) {
      animation-delay: -1.1s;
   }
   :nth-child(2) {
      animation-delay: -1s;
   }
   :nth-child(3) {
      animation-delay: -0.9s;
   }
   :nth-child(4) {
      animation-delay: -0.8s;
   }
   :nth-child(5) {
      animation-delay: -0.7s;
   }
   :nth-child(6) {
      animation-delay: -0.6s;
   }
   :nth-child(1):before {
      animation-delay: -1.1s;
   }
   :nth-child(2):before {
      animation-delay: -1s;
   }
   :nth-child(3):before {
      animation-delay: -0.9s;
   }
   :nth-child(4):before {
      animation-delay: -0.8s;
   }
   :nth-child(5):before {
      animation-delay: -0.7s;
   }
   :nth-child(6):before {
      animation-delay: -0.6s;
   }
`

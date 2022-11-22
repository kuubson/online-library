import styled, { keyframes } from 'styled-components'

const circleAnimation = keyframes`
    100% { 
        transform: rotate(360deg);
    } 
`

export const Circle = styled.div`
   width: 40px;
   height: 40px;
   position: relative;
   animation: ${circleAnimation} 2.5s infinite linear both;
`

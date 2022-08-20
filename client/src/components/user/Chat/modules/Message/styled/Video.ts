import styled from 'styled-components/macro'

export const Video = styled.video`
   max-width: 100%;
   height: 400px;
   border: 1px solid black;
   border-radius: 10px;
   @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
      max-width: 75vw;
      height: 50vh;
   }
`

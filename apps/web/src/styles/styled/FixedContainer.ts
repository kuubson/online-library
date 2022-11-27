import styled from 'styled-components'

export const FixedContainer = styled.section`
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.6);
   backdrop-filter: blur(3px);
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   top: 0px;
   left: 0px;
   z-index: 5;
`

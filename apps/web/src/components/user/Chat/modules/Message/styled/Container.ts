import styled from 'styled-components/macro'

export const Container = styled.div`
   min-height: 40px;
   margin-bottom: 10px;
   border-radius: 12px;
   background: rgba(0, 136, 255, 0.2);
   display: flex;
   justify-content: center;
   align-items: center;
   align-self: flex-end; // TODO: verify if this fixes chat layouts
   position: relative;
`

import styled from 'styled-components'

import { fadeIn } from 'assets/animations'

export const MessagesInfo = styled.div`
    padding: 10px;
    background: rgba(0, 136, 255, 0.4);
    font-size: 10px;
    font-weight: bold;
    box-shadow: 0px 0px 3px black;
    cursor: pointer;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0px);
    z-index: 1;
    animation: ${fadeIn} 0.5s ease-in-out;
`

import styled, { css } from 'styled-components'

import { fadeOut } from 'assets/animations'

type Props = {
    loading?: boolean
}

export const Loader = styled.div<Props>`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    ${({ loading }) =>
        !loading
            ? css`
                  animation: ${fadeOut} 0.5s ease-in-out both;
                  cursor: pointer;
              `
            : null};
`

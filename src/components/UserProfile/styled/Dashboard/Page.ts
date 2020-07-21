import styled, { css } from 'styled-components/macro'

interface ISCProps {
    flip?: boolean
    zIndex?: number
}

export default styled.div`
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    flex-direction: column;
    transform-origin: left;
    position: absolute;
    transition: all 1s ease-in-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${({ zIndex }: ISCProps) => zIndex};
    ${({ flip }) =>
        flip &&
        css`
            transform: translate(-50%, -50%) rotateY(-180deg);
        `};
`

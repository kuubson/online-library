import styled, { css } from 'styled-components'

type Page = {
    zIndex: number
    flip?: boolean
}

export default styled.div<Page>`
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    flex-direction: column;
    transform-origin: left;
    position: absolute;
    transition: transform 1s ease-out, z-index 0.5s ease-in-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${({ zIndex }) => zIndex};
    ${({ flip }) =>
        flip
            ? css`
                  transform: translate(-50%, -50%) rotateY(-180deg);
              `
            : null};
`

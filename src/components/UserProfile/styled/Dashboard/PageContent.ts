import styled, { css } from 'styled-components/macro'

interface ISCProps {
    back?: boolean
}

export default styled.div`
    width: 100%;
    height: 100%;
    background: #333;
    backface-visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${({ back }: ISCProps) =>
        back &&
        css`
            transform: translate(-50%, -50%) rotateY(180deg);
        `};
`

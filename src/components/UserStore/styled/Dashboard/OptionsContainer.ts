import styled, { css } from 'styled-components/macro'

interface ISCProps {
    shouldExpandMenu: boolean
}

export default styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: height 0.5s ease-in-out;
    @media (max-width: 800px) {
        width: 100%;
        height: 0px;
        overflow: hidden;
        background: #0088ff;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0px;
        ${({ shouldExpandMenu }: ISCProps) =>
            shouldExpandMenu &&
            css`
                height: 214px;
            `}
    }
`

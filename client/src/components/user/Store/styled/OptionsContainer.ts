import styled, { css } from 'styled-components'

type Props = {
    shouldMenuExpand?: boolean
}

export const OptionsContainer = styled.ul<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: height 0.4s ease-in-out;
    @media (max-width: 800px) {
        width: 100%;
        height: 0px;
        overflow: hidden;
        background: ${({ theme }) => theme.mainColor};
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0px;
        z-index: 2;
        ${({ shouldMenuExpand }) =>
            shouldMenuExpand
                ? css`
                      height: 210px;
                      border-bottom: 2px solid white;
                      transition: height 0.5s ease-in-out;
                  `
                : null}
    }
`

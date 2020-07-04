import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: 20px;
    border-bottom: 2.5px solid white;
    margin-bottom: 4px;
    transition: 0.5s ease-in-out;
    :last-of-type {
        margin-bottom: 0px;
    }
    ${({ shouldExpandMenu }: { shouldExpandMenu: boolean }) =>
        shouldExpandMenu &&
        css`
            margin-bottom: 0px;
            :nth-child(1) {
                opacity: 0;
            }
            :nth-child(3) {
                transform: rotate(90deg) translateX(-2.5px);
            }
        `}
`

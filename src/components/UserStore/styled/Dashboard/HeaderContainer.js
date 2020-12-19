import styled, { css } from 'styled-components/macro'

export default styled.div`
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1100px) {
        height: 40px;
        flex-direction: column;
    }
    ${({ withoutInput }) =>
        withoutInput &&
        css`
            height: 10px !important;
        `};
`

import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: 100%;
    height: 100%;
    margin-left: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    @media (max-width: 1150px) {
        margin-top: 20px;
        margin-left: 0px;
    }
    ${({ withoutMargin }) =>
        withoutMargin &&
        css`
            margin-top: 0px !important;
            margin-left: 0px;
        `};
    ${({ withFlips }) =>
        withFlips &&
        css`
            height: auto;
            margin-top: 80px !important;
            @media (max-width: 500px) {
                margin-top: 50px !important;
            }
        `};
`
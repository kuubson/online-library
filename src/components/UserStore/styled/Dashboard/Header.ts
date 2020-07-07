import styled, { css } from 'styled-components/macro'

export default styled.h2`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 40px;
    @media (max-width: 1200px) {
        font-size: 20px;
    }
    @media (max-width: 900px) {
        font-size: 18px;
    }
    @media (max-width: 600px) {
        font-size: 16px;
    }
    ${({ withMoreMarginTop }: { withMoreMarginTop?: boolean }) =>
        withMoreMarginTop &&
        css`
            @media (max-width: 900px) {
                margin-top: 20px;
            }
        `};
`

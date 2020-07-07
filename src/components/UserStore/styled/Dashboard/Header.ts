import styled, { css } from 'styled-components/macro'

export default styled.h2`
    white-space: nowrap;
    font-size: 22px;
    padding-right: 40px;
    font-weight: bold;
    @media (max-width: 1200px) {
        font-size: 20px;
    }
    @media (max-width: 1100px) {
        padding-right: 0px;
    }
    @media (max-width: 900px) {
        font-size: 18px;
    }
    @media (max-width: 600px) {
        font-size: 16px;
    }
    ${({ withMoreMarginBottom }: { withMoreMarginBottom?: boolean }) =>
        withMoreMarginBottom &&
        css`
            @media (max-width: 1100px) {
                margin-bottom: 20px;
            }
        `};
`

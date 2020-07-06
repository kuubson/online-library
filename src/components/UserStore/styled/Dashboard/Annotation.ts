import styled, { css } from 'styled-components/macro'

export default styled.p`
    font-size: 15px;
    font-weight: bold;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0px);
    @media (max-width: 900px) {
        font-size: 14px;
    }
    @media (max-width: 600px) {
        font-size: 13px;
    }
    ${({ withTitle }: { withTitle?: boolean }) =>
        withTitle &&
        css`
            top: 60px;
            font-weight: initial;
            font-size: 13px;
            @media (max-width: 900px) {
                font-size: 12px;
            }
            @media (max-width: 600px) {
                font-size: 11px;
            }
        `}
`

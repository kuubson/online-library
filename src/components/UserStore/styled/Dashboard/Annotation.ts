import styled, { css } from 'styled-components/macro'

export default styled.p`
    width: 150px;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
            margin-top: 10px;
            @media (max-width: 900px) {
                font-size: 12px;
            }
            @media (max-width: 600px) {
                font-size: 11px;
            }
        `}
`

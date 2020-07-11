import styled, { css } from 'styled-components/macro'

interface ISCProps {
    withMoreMarginBottom?: boolean
    withPaddingRight?: boolean
    black?: boolean
}

export default styled.h2`
    white-space: nowrap;
    font-size: 22px;
    line-height: 1.5;
    font-weight: bold;
    @media (max-width: 1200px) {
        font-size: 20px;
    }
    @media (max-width: 900px) {
        font-size: 18px;
    }
    @media (max-width: 600px) {
        font-size: 16px;
    }
    ${({ withMoreMarginBottom }: ISCProps) =>
        withMoreMarginBottom &&
        css`
            @media (max-width: 1100px) {
                margin-bottom: 20px;
            }
        `};
    ${({ withPaddingRight }) =>
        withPaddingRight &&
        css`
            padding-right: 30px;
            @media (max-width: 1100px) {
                padding-right: 0px;
            }
        `};
    ${({ black }) =>
        black &&
        css`
            color: black;
            padding-right: 0px;
            white-space: pre-line;
            font-size: 18px;
            font-weight: initial;
            @media (max-width: 1200px) {
                font-size: 17px;
            }
            @media (max-width: 900px) {
                font-size: 16px;
            }
            @media (max-width: 600px) {
                font-size: 15px;
            }
        `};
`

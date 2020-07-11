import styled, { css } from 'styled-components/macro'

interface ISCProps {
    withMoreMarginTop?: boolean
    withoutInput?: boolean
}

export default styled.div`
    margin-bottom: 40px;
    height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1100px) {
        flex-direction: column;
        height: 40px;
    }
    ${({ withMoreMarginTop }: ISCProps) =>
        withMoreMarginTop &&
        css`
            @media (max-width: 800px) {
                height: 10px;
                margin-top: 20px;
            }
        `};
    ${({ withoutInput }: ISCProps) =>
        withoutInput &&
        css`
            @media (max-width: 1100px) {
                height: 10px;
            }
        `};
`

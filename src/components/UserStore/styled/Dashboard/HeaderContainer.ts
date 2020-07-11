import styled, { css } from 'styled-components/macro'

interface ISCProps {
    withoutInput?: boolean
}

export default styled.div`
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1100px) {
        height: 40px;
        flex-direction: column;
    }
    ${({ withoutInput }: ISCProps) =>
        withoutInput &&
        css`
            height: 10px !important;
        `};
`

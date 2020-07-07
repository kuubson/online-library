import styled, { css } from 'styled-components/macro'

interface ISCProps {
    withPaidBooks?: boolean
}

export default styled.div`
    width: 55%;
    margin-top: 30px;
    @media (max-width: 800px) {
        width: 100%;
    }
    ${({ withPaidBooks }: ISCProps) =>
        withPaidBooks &&
        css`
            width: 45%;
        `};
`

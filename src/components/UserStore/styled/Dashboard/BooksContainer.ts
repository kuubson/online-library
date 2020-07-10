import styled, { css } from 'styled-components/macro'

interface ISCProps {
    withPaidBooks?: boolean
    shouldBeAtTheBottom?: boolean
}

export default styled.div`
    width: 55%;
    margin-top: 30px;
    align-self: stretch;
    @media (max-width: 800px) {
        width: 100%;
        margin-top: 20px;
    }
    ${({ withPaidBooks }: ISCProps) =>
        withPaidBooks &&
        css`
            width: 45%;
        `};
    ${({ shouldBeAtTheBottom }) =>
        shouldBeAtTheBottom &&
        css`
            @media (max-width: 800px) {
                order: 2;
            }
        `}
`

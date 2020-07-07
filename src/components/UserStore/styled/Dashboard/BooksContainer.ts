import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: 55%;
    margin-top: 30px;
    @media (max-width: 900px) {
        width: 100%;
    }
    ${({ withPaidBooks }: { withPaidBooks?: boolean }) =>
        withPaidBooks &&
        css`
            width: 45%;
        `};
`

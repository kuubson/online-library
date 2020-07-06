import styled, { css } from 'styled-components/macro'

export default styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-auto-rows: 270px;
    grid-gap: 20px;
    ${({ withPaidBooks }: { withPaidBooks?: boolean }) =>
        withPaidBooks &&
        css`
            margin-left: 20px;
            @media (max-width: 900px) {
                margin-left: 0px;
            }
        `};
`

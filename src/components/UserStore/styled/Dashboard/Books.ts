import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

interface ISCProps {
    empty?: boolean
    withPaidBooks?: boolean
}

export default styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: 270px;
    grid-gap: 20px;

    ${({ empty }) =>
        empty &&
        css`
            height: calc(${() => hooks.useHeight()} - 190px);
            display: flex;
            justify-content: center;
            align-items: center;
        `}
    ${({ withPaidBooks }: ISCProps) =>
        withPaidBooks &&
        css`
            margin-left: 20px;
            @media (max-width: 800px) {
                margin-left: 0px;
            }
        `};
`

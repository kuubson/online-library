import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

interface ISCProps {
    withPaidBooks?: boolean
    empty?: boolean
    height?: string
}

export default styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: 270px;
    grid-gap: 20px;
    ${({ withPaidBooks }: ISCProps) =>
        withPaidBooks &&
        css`
            margin-left: 20px;
            @media (max-width: 800px) {
                margin-left: 0px;
            }
        `};
    ${({ empty }) =>
        empty &&
        css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(${() => hooks.useHeight()} - 190px);
        `}
`

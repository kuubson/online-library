import styled, { css } from 'styled-components/macro'

export default styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: 270px;
    grid-gap: 20px;
    ${({ withPaidBooks }: { withPaidBooks?: boolean; empty?: boolean; height?: () => string }) =>
        withPaidBooks &&
        css`
            margin-left: 20px;
            @media (max-width: 800px) {
                margin-left: 0px;
            }
        `};
    ${({ empty, height }) =>
        empty &&
        css`
            height: calc(${height} - 242px);
            display: flex;
            justify-content: center;
            align-items: center;
        `}
`

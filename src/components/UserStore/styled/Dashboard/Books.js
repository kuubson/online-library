import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

export default styled.div`
    margin-top: 35px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: 249px;
    grid-gap: 20px;
    justify-items: center;
    align-items: center;
    ${({ empty }) =>
        empty &&
        css`
            height: ${() => `calc(${hooks.useHeight()} - 150px)`};
            margin-top: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
        `}
`

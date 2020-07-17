import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

interface ISCProps {
    empty?: boolean
    height?: string
}

export default styled.div`
    margin-top: 35px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: 249px;
    grid-gap: 20px;
    ${({ empty, height }: ISCProps) =>
        empty &&
        css`
            height: calc(100vh - 150px);
            margin-top: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
        `}
`

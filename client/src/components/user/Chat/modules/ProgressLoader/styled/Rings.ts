import styled from 'styled-components/macro'

type Props = {
    dimension: number
}

export const Rings = styled.svg<Props>`
    width: ${({ dimension }) => dimension}px;
    height: ${({ dimension }) => dimension}px;
    stroke-width: 2;
    stroke: white;
    fill: transparent;
`

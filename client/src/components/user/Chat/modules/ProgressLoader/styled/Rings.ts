import styled from 'styled-components/macro'

type StyledProps = {
   dimension: number
}

export const Rings = styled.svg<StyledProps>`
   width: ${({ dimension }) => dimension}px;
   height: ${({ dimension }) => dimension}px;
   stroke-width: 2;
   stroke: white;
   fill: transparent;
`

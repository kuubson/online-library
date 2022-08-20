import styled from 'styled-components/macro'

type StyledProps = {
   dimension: number
}

export const RingsContainer = styled.div<StyledProps>`
   width: ${({ dimension }) => dimension}px;
   height: ${({ dimension }) => dimension}px;
   position: relative;
`

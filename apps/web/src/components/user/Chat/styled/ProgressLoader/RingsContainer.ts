import styled from 'styled-components'

type StyledProps = {
   dimension: number
}

export const RingsContainer = styled.div<StyledProps>`
   width: ${({ dimension }) => dimension}px;
   height: ${({ dimension }) => dimension}px;
   position: relative;
`

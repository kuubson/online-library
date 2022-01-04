import styled from 'styled-components/macro'

type Props = {
    dimension: number
}

export const RingsContainer = styled.div<Props>`
    width: ${({ dimension }) => dimension}px;
    height: ${({ dimension }) => dimension}px;
    position: relative;
`

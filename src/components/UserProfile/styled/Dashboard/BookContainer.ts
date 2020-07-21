import styled, { css } from 'styled-components/macro'

interface ISCProps {
    withFlips?: boolean
    isRead?: boolean
}

export default styled.div`
    width: 400px;
    height: 400px;
    perspective: 1000px;
    transition: transform 1s ease-in-out;
    ${({ withFlips }: ISCProps) =>
        withFlips &&
        css`
            transform: translateX(50%);
        `};
    ${({ isRead }: ISCProps) =>
        isRead &&
        css`
            transform: translateX(100%);
        `};
`

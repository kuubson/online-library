import styled, { css } from 'styled-components'

type Props = {
    shouldMenuExpand?: boolean
}

export const Line = styled.div<Props>`
    width: 20px;
    border-bottom: 3px solid white;
    margin-bottom: 4px;
    transition: 0.5s ease-in-out;
    :last-of-type {
        margin-bottom: 0px;
    }
    ${({ shouldMenuExpand }) =>
        shouldMenuExpand
            ? css`
                  margin-bottom: 0px;
                  :nth-child(1) {
                      opacity: 0;
                  }
                  :nth-child(3) {
                      transform: rotate(90deg) translateX(-2.8px);
                  }
              `
            : null}
`

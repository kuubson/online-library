import styled, { css } from 'styled-components'

type Props = {
    withoutInput?: boolean
}

export const HeaderContainer = styled.div<Props>`
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1100px) {
        height: 40px;
        flex-direction: column;
    }
    ${({ withoutInput }) =>
        withoutInput
            ? css`
                  height: 10px !important;
              `
            : null};
`

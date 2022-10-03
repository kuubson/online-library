import styled, { css } from 'styled-components/macro'

type StyledProps = {
   hoverable?: boolean
}

export const Badge = styled.img<StyledProps>`
   ${({ hoverable }) =>
      hoverable &&
      css`
         transition: transform 0.3s ease-in-out;
         cursor: pointer;
         :hover {
            transform: scale(1.05);
         }
      `}
`

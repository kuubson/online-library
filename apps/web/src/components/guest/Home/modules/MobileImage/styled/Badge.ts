import styled, { css } from 'styled-components'

type StyledProps = {
   $active?: boolean
   $hoverable?: boolean
}

export const Badge = styled.img.attrs({ 'data-cy': 'badge' })<StyledProps>`
   opacity: 0.7;
   ${({ $hoverable }) =>
      $hoverable &&
      css`
         transition: transform 0.3s ease-in-out;
         cursor: pointer;
         :hover {
            transform: scale(1.05);
         }
      `}
   ${({ $active }) =>
      $active &&
      css`
         opacity: 1;
      `}
`

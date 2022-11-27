import styled, { css } from 'styled-components'

type StyledProps = {
   withCurrentUser?: boolean
}

export const Container = styled.div<StyledProps>`
   min-height: 40px;
   margin-bottom: 10px;
   border-radius: 12px;
   background: rgba(0, 136, 255, 0.2);
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   ${({ withCurrentUser }) =>
      withCurrentUser
         ? css`
              align-self: flex-end;
           `
         : null}
`

import styled, { css } from 'styled-components/macro'

type StyledProps = {
   withCurrentUser?: boolean
   withLastUserMessage?: boolean
   shouldDetailsAppear?: boolean
}

export const Date = styled.div<StyledProps>`
   width: 100%;
   font-size: 11px;
   text-align: left;
   font-weight: bold;
   white-space: nowrap;
   ${({ withCurrentUser }) =>
      withCurrentUser
         ? css`
              text-align: right;
           `
         : null}
   ${({ withLastUserMessage, shouldDetailsAppear }) =>
      !withLastUserMessage && shouldDetailsAppear
         ? css`
              margin-bottom: 10px;
           `
         : null}
`

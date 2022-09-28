import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

type StyledProps = {
   withCurrentUser: boolean
   withLastUserMessage: boolean
   shouldDetailsAppear: boolean
}

export const Date = styled(Text)<StyledProps>`
   width: 100%;
   font-size: ${moderateScale(13)}px;
   text-align: left;
   ${({ withCurrentUser }) =>
      withCurrentUser
         ? css`
              align-self: flex-end;
           `
         : null}
   ${({ withLastUserMessage, shouldDetailsAppear }) =>
      !withLastUserMessage && shouldDetailsAppear
         ? css`
              margin-bottom: ${moderateScale(10)}px;
           `
         : null};
`

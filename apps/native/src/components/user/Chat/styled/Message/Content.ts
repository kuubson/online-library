import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

type StyledProps = {
   withLetterSpacing: boolean
}

export const Content = styled(Text)<StyledProps>`
   max-width: 80%;
   text-align: justify;
   ${({ withLetterSpacing }) =>
      withLetterSpacing
         ? css`
              letter-spacing: ${moderateScale(2)}px;
           `
         : null}
`

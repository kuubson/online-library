import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

export const Content = styled(Text)`
   max-width: 80%;
   text-align: justify;
   ${({ withLetterSpacing }) =>
      withLetterSpacing
         ? css`
              letter-spacing: ${moderateScale(2)}px;
           `
         : null}
`

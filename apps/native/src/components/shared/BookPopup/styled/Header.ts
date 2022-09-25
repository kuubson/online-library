import styled from 'styled-components/native'

import { scale } from 'styles'

import { Text } from 'components/shared/styled'

export const Header = styled(Text)`
   text-align: center;
   color: ${({ black }) => (black ? 'black' : 'white')};
   font-size: ${scale(17)}px;
   margin-top: ${scale(25)}px;
   margin-bottom: ${scale(25)}px;
`

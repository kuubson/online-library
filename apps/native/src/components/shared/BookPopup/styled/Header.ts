import styled from 'styled-components/native'

import { moderateScale } from 'styles'

import { Text } from 'components/shared/styled'

export const Header = styled(Text)`
   text-align: center;
   color: ${({ black }) => (black ? 'black' : 'white')};
   font-size: ${moderateScale(17)}px;
   margin-top: ${moderateScale(25)}px;
   margin-bottom: ${moderateScale(25)}px;
`

import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'
import { randomImage } from '@online-library/core'

import * as Styled from './styled'

export const Wrapper = ({ children }: ReactChildren) => (
   <WrapperContainer source={{ uri: randomImage }} resizeMode="cover">
      <Styled.Layer />
      <Styled.ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</Styled.ScrollView>
   </WrapperContainer>
)

const WrapperContainer = styled(ImageBackground)`
   flex: 1;
`

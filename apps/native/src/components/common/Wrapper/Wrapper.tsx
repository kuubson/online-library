import type { ReactChildren } from '@online-library/core'

import * as Styled from './styled'

export const Wrapper = ({ children }: ReactChildren) => (
   <Styled.Background source={{ uri: 'https://picsum.photos/1920/1080' }} resizeMode="cover">
      <Styled.Layer />
      <Styled.ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</Styled.ScrollView>
   </Styled.Background>
)

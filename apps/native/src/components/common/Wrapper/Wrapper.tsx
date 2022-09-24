import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'

import { RANDOM_IMAGE } from '@online-library/config'

import type { ReactChildren } from '@online-library/core'
import { useLoader } from '@online-library/core'

import * as Styled from './styled'

import { Loader } from '../Loader/Loader'

export const Wrapper = ({ children }: ReactChildren) => {
   const { loading } = useLoader()
   return (
      <WrapperContainer source={{ uri: RANDOM_IMAGE }} resizeMode="cover">
         {loading && <Loader />}
         <Styled.Layer />
         <Styled.ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</Styled.ScrollView>
      </WrapperContainer>
   )
}

const WrapperContainer = styled(ImageBackground)`
   flex: 1;
`

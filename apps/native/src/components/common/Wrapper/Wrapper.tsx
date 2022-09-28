import { useRoute } from '@react-navigation/native'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'

import { RANDOM_IMAGE } from '@online-library/config'

import { ReactChildren, useApiFeedback, useBookPopup, useLoader } from '@online-library/core'

import * as Styled from './styled'

import { BookPopup } from 'components/shared'

import { ApiFeedback } from '../ApiFeedback/ApiFeedback'
import { Loader } from '../Loader/Loader'

export const Wrapper = ({ children }: ReactChildren) => {
   const { name } = useRoute()

   const { loading } = useLoader()

   const { showApiFeedback } = useApiFeedback()

   const { showBookPopup } = useBookPopup()

   return (
      <WrapperContainer source={{ uri: RANDOM_IMAGE }} resizeMode="cover">
         {loading && <Loader />}
         {showApiFeedback && <ApiFeedback />}
         {showBookPopup && <BookPopup />}
         <Styled.Layer />
         {name !== 'Chat' ? (
            <Styled.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
               {children}
            </Styled.ScrollView>
         ) : (
            children
         )}
      </WrapperContainer>
   )
}

const WrapperContainer = styled(ImageBackground)`
   flex: 1;
`

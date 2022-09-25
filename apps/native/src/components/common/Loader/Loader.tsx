import React from 'react'
import Spinner from 'react-native-spinkit'

import { scale } from 'styles'

import { AbsoluteContainer } from 'components/shared/styled'

export const Loader = () => (
   <AbsoluteContainer>
      <Spinner color="white" type="Circle" size={scale(50)} />
   </AbsoluteContainer>
)

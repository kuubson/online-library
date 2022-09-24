import React from 'react'
import Spinner from 'react-native-spinkit'
import styled from 'styled-components/native'

import { scale } from 'styles'

export const Loader = () => (
   <LoaderContainer>
      <Spinner color="white" type="Circle" size={scale(50)} />
   </LoaderContainer>
)

const LoaderContainer = styled.View`
   background: rgba(0, 0, 0, 0.8);
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 0px;
   right: 0px;
   bottom: 0px;
   left: 0px;
   z-index: 2;
`

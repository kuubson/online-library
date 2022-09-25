import React from 'react'
import styled from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'

import { scale } from 'styles'

import { Wrapper } from '../Wrapper/Wrapper'

export const Guest = ({ children }: ReactChildren) => (
   <Wrapper>
      <GuestContainer>{children}</GuestContainer>
   </Wrapper>
)

const GuestContainer = styled.View`
   padding: ${scale(25)}px;
   justify-content: center;
   flex: 1;
`

import React from 'react'
import styled from 'styled-components/native'

import type { ReactFC } from '@online-library/core'

import { useGuest } from '@online-library/logic'

import { moderateScale } from 'styles'

import { Wrapper } from '../Wrapper/Wrapper'

export const Guest = ({ children }: ReactFC) => {
   useGuest()
   return (
      <Wrapper>
         <GuestContainer>{children}</GuestContainer>
      </Wrapper>
   )
}

const GuestContainer = styled.View`
   padding: ${moderateScale(25)}px;
   justify-content: center;
   flex: 1;
`

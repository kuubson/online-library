import React from 'react'
import styled from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'

import { useGuest } from '@online-library/ui'

import { moderateScale } from 'styles'

import { Wrapper } from '../Wrapper/Wrapper'

export const Guest = ({ children }: ReactChildren) => {
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

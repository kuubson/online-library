import { useRoute } from '@react-navigation/native'
import styled from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'

import { useSocketIO, useUser } from '@online-library/ui'

import { SERVER_NATIVE_URL } from 'config'

import { moderateScale } from 'styles'

import { Wrapper } from '../Wrapper/Wrapper'

export const User = ({ children }: ReactChildren) => {
   const { name } = useRoute()

   useSocketIO({ SERVER_NATIVE_URL, withChat: name === 'Chat' })

   useUser()

   return (
      <Wrapper>
         <UserContainer>{children}</UserContainer>
      </Wrapper>
   )
}

const UserContainer = styled.View`
   margin-top: ${moderateScale(30)}px;
   justify-content: center;
   flex: 1;
`

import { useRoute } from '@react-navigation/native'
import styled from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'

import { useSocketIO, useUser } from '@online-library/ui'

import { SERVER_NATIVE_URL } from 'config'

import { moderateScale } from 'styles'

import { Wrapper } from '../Wrapper/Wrapper'

export const User = ({ children }: ReactChildren) => {
   const { name } = useRoute()

   const withChat = name === 'Chat'

   useSocketIO({ SERVER_NATIVE_URL, withChat })

   useUser()

   return (
      <Wrapper>
         <UserContainer withChat={withChat}>{children}</UserContainer>
      </Wrapper>
   )
}

type UserContainerProps = {
   withChat: boolean
}

const UserContainer = styled.View<UserContainerProps>`
   margin-top: ${({ withChat }) => moderateScale(withChat ? 0 : 30)}px;
   justify-content: center;
   flex: 1;
`

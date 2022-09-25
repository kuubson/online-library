import { useRoute } from '@react-navigation/native'
import styled from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'

import { useSocketIO, useUser } from '@online-library/ui'

import { scale } from 'styles'

export const User = ({ children }: ReactChildren) => {
   const { name } = useRoute()

   useSocketIO({ withChat: name === 'Chat' })

   useUser()

   return <UserContainer>{children}</UserContainer>
}

const UserContainer = styled.View`
   padding: ${scale(25)}px;
   justify-content: center;
   flex: 1;
`

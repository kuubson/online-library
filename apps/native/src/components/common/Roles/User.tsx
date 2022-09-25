import { useRoute } from '@react-navigation/native'
import styled from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'

import { useSocketIO, useUser } from '@online-library/ui'

import { scale } from 'styles'

import { Wrapper } from '../Wrapper/Wrapper'

export const User = ({ children }: ReactChildren) => {
   const { name } = useRoute()

   useSocketIO({ withChat: name === 'Chat' })

   useUser()

   return (
      <Wrapper>
         <UserContainer>{children}</UserContainer>
      </Wrapper>
   )
}

const UserContainer = styled.View`
   padding: ${scale(25)}px;
   justify-content: center;
   flex: 1;
`

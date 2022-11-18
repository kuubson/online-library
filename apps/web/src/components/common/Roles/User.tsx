import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import type { ReactFC } from '@online-library/core'

import { useSocketIO, useUser } from '@online-library/logic'

import { RoleContainer } from 'styles/styled'

import { Menu } from 'components/shared'

export const User = ({ children }: ReactFC) => {
   const { pathname } = useLocation()

   const canUpdateChatDetails = pathname !== '/chat'

   useSocketIO({ canUpdateChatDetails })

   useUser()

   return (
      <UserContent>
         <Menu />
         {children}
      </UserContent>
   )
}

const UserContent = styled(RoleContainer)`
   display: block;
`

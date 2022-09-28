import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import type { ReactChildren } from '@online-library/core'

import { useSocketIO, useUser } from '@online-library/ui'

import { RoleContainer } from 'components/shared/styled'

import { Menu } from 'components/shared'

export const User = ({ children }: ReactChildren) => {
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

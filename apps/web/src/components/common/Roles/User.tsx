import styled from 'styled-components/macro'

import type { ReactChildren } from '@online-library/core'

import { RoleContainer } from 'components/shared/styled'

import { Menu } from 'components/shared'

import { useUser } from './hooks'

type UserProps = ReactChildren & {
   withChat?: boolean
}

export const User = ({ children, withChat }: UserProps) => {
   const { options } = useUser(withChat)
   return (
      <UserContent>
         <Menu options={options} />
         {children}
      </UserContent>
   )
}

const UserContent = styled(RoleContainer)`
   display: block;
`

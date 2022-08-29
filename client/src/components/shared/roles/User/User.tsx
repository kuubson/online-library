import React, { useState } from 'react'

import styled from 'styled-components/macro'

import { Menu } from 'components/shared'

import { GuestContainer } from 'components/shared/Roles/Guest/Guest'

import { useUser } from './hooks'

type UserProps = {
   children: React.ReactNode
   withChat?: boolean
}

export const User = ({ children, withChat }: UserProps) => {
   const { options } = useUser(withChat)

   const [shouldMenuExpand, _setShouldMenuExpand] = useState(false)

   return (
      <>
         <Menu options={options} _setShouldMenuExpand={_setShouldMenuExpand} />
         <UserContainer>
            {React.cloneElement(children as JSX.Element, { shouldMenuExpand })}
         </UserContainer>
      </>
   )
}

const UserContainer = styled(GuestContainer)`
   height: auto;
   min-height: 100%;
`

import React, { useState } from 'react'

import styled from 'styled-components/macro'

import { GuestContainer } from 'components/shared/Roles/Guest/Guest'
import { Menu } from 'components/user/Store/modules'

import { useUser } from './hooks'

type UserProps = {
   withChat?: boolean
}

export const User: React.FC<UserProps> = ({ children, withChat }) => {
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

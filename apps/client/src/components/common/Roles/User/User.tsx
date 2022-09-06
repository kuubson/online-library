import React, { useState } from 'react'
import styled from 'styled-components/macro'

import { RoleContainer } from 'components/shared/styled'

import { Menu } from 'components/shared'

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
         <UserContent>
            {React.cloneElement(children as JSX.Element, { shouldMenuExpand })}
         </UserContent>
      </>
   )
}

const UserContent = styled(RoleContainer)`
   height: auto;
   min-height: 100%;
`

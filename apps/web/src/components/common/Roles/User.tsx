import React, { useState } from 'react'
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

   const [shouldMenuExpand, _setShouldMenuExpand] = useState(false) // TODO: simplify this

   return (
      <>
         <UserContent>
            <Menu options={options} _setShouldMenuExpand={_setShouldMenuExpand} />
            {React.cloneElement(children as JSX.Element, { shouldMenuExpand })}
         </UserContent>
      </>
   )
}

const UserContent = styled(RoleContainer)`
   display: block;
`

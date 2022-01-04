import React, { useState } from 'react'
import styled from 'styled-components'

import { GuestContainer } from 'components/shared/roles/Guest/Guest'

import Menu from 'components/user/Store/modules/Menu'

import { useUser } from './hooks'

const UserContainer = styled(GuestContainer)`
    height: auto;
    min-height: 100%;
`

interface IUser {
    withChat?: boolean
}

export const User: React.FC<IUser> = ({ children, withChat }) => {
    const { options } = useUser(withChat)
    const [shouldMenuExpand, _setShouldMenuExpand] = useState(false)
    return (
        <>
            <Menu options={options} _setShouldMenuExpand={_setShouldMenuExpand} />
            <UserContainer>
                {React.cloneElement(children as any, {
                    shouldMenuExpand
                })}
            </UserContainer>
        </>
    )
}

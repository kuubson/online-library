import React from 'react'
import styled from 'styled-components'

import hooks from '~hooks'

import { GuestContainer } from '~components/Roles/Guest'

const UserContainer = styled(GuestContainer)``

const User: React.FC = ({ children }) => {
    return <UserContainer blurred={hooks.useBlur()}>{children}</UserContainer>
}

export default User

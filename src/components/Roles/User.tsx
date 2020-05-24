import React from 'react'
import styled from 'styled-components/macro'

const UserContainer = styled.section`
    height: 100%;
`

const User: React.FC = ({ children }) => {
    return <UserContainer>{children}</UserContainer>
}

export default User

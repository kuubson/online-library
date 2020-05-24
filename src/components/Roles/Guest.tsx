import React from 'react'
import styled from 'styled-components/macro'

const GuestContainer = styled.section`
    height: 100%;
`

const Guest: React.FC = ({ children }) => {
    return <GuestContainer>{children}</GuestContainer>
}

export default Guest

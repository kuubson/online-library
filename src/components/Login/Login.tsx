import React from 'react'
import styled from 'styled-components/macro'

import { HomeContainer } from 'components/Home/Home'

import Composed from './composed'

const LoginContainer = styled(HomeContainer)``

const Login: React.FC = () => {
    return (
        <LoginContainer>
            <Composed.Input />
        </LoginContainer>
    )
}

export default Login

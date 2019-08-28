import React from 'react'
import styled from 'styled-components'

import MainBackground from '../../assets/img/MainBackground.jpg'
import LoginInput from './LoginInput'
import LoginSubmit from './LoginSubmit'

const LoginWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${MainBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Login = () => {
    return (
        <LoginWrapper>
            <LoginInput placeholder="Type your e-mail..." label="E-mail" />
            <LoginInput secure placeholder="Type your password..." label="Password" />
            <LoginSubmit />
        </LoginWrapper>
    )
}

export default Login
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

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
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [successResponseMessage, setsuccessResponseMessage] = useState()
    const [errorResponseMessage, seterrorResponseMessage] = useState()
    const handleLogin = () => {
        axios.post('/login', {
            email,
            password
        }).then(res => {
            console.log(res)
        })
    }
    return (
        <LoginWrapper>
            <LoginInput placeholder="Type your e-mail..." label="E-mail" onChange={setEmail} />
            <LoginInput secure placeholder="Type your password..." label="Password" onChange={setPassword} />
            <LoginSubmit onClick={handleLogin} />
        </LoginWrapper>
    )
}

export default Login
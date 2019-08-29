import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import MainBackground from '../../assets/img/MainBackground.jpg'
import LoginInput from './LoginInput'
import LoginSubmit from './LoginSubmit'
import Loader from '../../sharedComponents/Loader/Loader'
import ApiResponseHandler from '../../sharedComponents/Errors/ApiResponseHandler'

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
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessageError, setResponseMessageError] = useState()
    const [responseMessageWarning, setResponseMessageWarning] = useState()
    const [responseMessageSuccess, setResponseMessageSuccess] = useState()
    const handleLogin = () => {
        setIsLoading(true)
        axios.post('/login', {
            email,
            password
        }).then(res => {
            setIsLoading(false)
            if (res.data.error) {
                setResponseMessageError(res.data.errorMessage)
            }
            if (res.data.warning) {
                setResponseMessageWarning(res.data.warningMessage)
            }
            if (res.data.success) {
                setResponseMessageSuccess(res.data.successMessage)
            }
        })
    }
    const hideApiResponseHandler = () => {
        setResponseMessageError()
        setResponseMessageWarning()
        setResponseMessageSuccess()
    }
    return (
        <LoginWrapper>
            <LoginInput placeholder="Type your e-mail..." label="E-mail" onChange={setEmail} />
            <LoginInput secure placeholder="Type your password..." label="Password" onChange={setPassword} />
            <LoginSubmit onClick={handleLogin} />
            {isLoading && <Loader />}
            {responseMessageError && <ApiResponseHandler error responseMessage={responseMessageError} onClick={hideApiResponseHandler} />}
            {responseMessageWarning && <ApiResponseHandler warning responseMessage={responseMessageWarning} onClick={hideApiResponseHandler} />}
            {responseMessageSuccess && <ApiResponseHandler success responseMessage={responseMessageSuccess} onClick={hideApiResponseHandler} />}
        </LoginWrapper>
    )
}

export default Login
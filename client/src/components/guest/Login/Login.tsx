import React, { useState } from 'react'
import styled from 'styled-components'

import { RegistrationContainer } from 'components/guest/Registration/Registration'

import HomeButton from 'components/guest/Registration/modules/HomeButton'
import Input from 'components/guest/Registration/modules/Input'

import * as StyledRegistration from 'components/guest/Registration/styled'

import { useFormHandler } from 'hooks'

import { setApiFeedback, handleApiValidation } from 'helpers'

import { axios, history } from 'utils'

const LoginContainer = styled(RegistrationContainer)``

type FBRequest = {
    authResponse: {
        userID: string
        signedRequest: string
        expiresIn: string
        accessToken: string
    }
    status: 'connected' | 'not_authorized'
}

type FBResponse = {
    first_name: string
    email: string
}

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    })
    const { email, emailError, password, passwordError } = form
    const formHandler = useFormHandler(setForm)
    const login = async (event: React.FormEvent) => {
        event.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/auth/login'
                const response = await axios.post(url, {
                    email,
                    password
                })
                if (response) {
                    history.push('/store')
                }
            } catch (error) {
                handleApiValidation(error, setForm)
            }
        }
    }
    const validate = () => {
        let isValidated = true
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: ''
        }))
        if (!formHandler.validateEmail(email)) isValidated = false
        if (!formHandler.validatePassword(password, '', true)) isValidated = false
        return isValidated
    }
    const loginWithFacebook = async (event: React.MouseEvent) => {
        event.preventDefault()
        const url = '/api/user/auth/loginWithFacebook'
        window.FB.login(
            ({ authResponse, status }: FBRequest) => {
                if (authResponse && status === 'connected') {
                    return window.FB.api(
                        '/me?fields=id,first_name,email',
                        async ({ first_name, email }: FBResponse) => {
                            const response = await axios.post(url, {
                                name: first_name,
                                email,
                                access_token: authResponse.accessToken
                            })
                            if (response) {
                                history.push('/store')
                            }
                        }
                    )
                }
                setApiFeedback(
                    'Logging to app',
                    'There was an unexpected problem when logging in with Facebook',
                    'Okey'
                )
            },
            { scope: 'email,public_profile' }
        )
    }
    return (
        <LoginContainer>
            <HomeButton />
            <StyledRegistration.Form onSubmit={login}>
                <Input
                    id="email"
                    label="Email"
                    type="text"
                    value={email}
                    placeholder="Type your email address..."
                    error={emailError}
                    onChange={event => {
                        formHandler.handleInputValue(event)
                        formHandler.validateEmail(event.target.value)
                    }}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={event => {
                        formHandler.handleInputValue(event)
                        formHandler.validatePassword(event.target.value, '', true)
                    }}
                />
                <StyledRegistration.Submit>Login</StyledRegistration.Submit>
                <StyledRegistration.Submit onClick={loginWithFacebook} withFacebook>
                    Login with Facebook
                </StyledRegistration.Submit>
                <StyledRegistration.AnnotationsContainer>
                    <StyledRegistration.Annotation onClick={() => history.push('/registration')}>
                        {"I don't have an account yet, go to registration page"}
                    </StyledRegistration.Annotation>
                    <StyledRegistration.Annotation
                        onClick={() => history.push('/password-support')}
                    >
                        I forgot password
                    </StyledRegistration.Annotation>
                </StyledRegistration.AnnotationsContainer>
            </StyledRegistration.Form>
        </LoginContainer>
    )
}

export default Login

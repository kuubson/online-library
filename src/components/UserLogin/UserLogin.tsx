import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { UserRegistrationContainer } from 'components/UserRegistration/UserRegistration'
import URDashboard from 'components/UserRegistration/styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

import utils from 'utils'

declare global {
    interface Window {
        FB: any
    }
}

interface IFacebookResponse {
    authResponse: {
        accessToken: string
    }
    status: 'authorization_expired' | 'connected' | 'not_authorized' | 'unknown'
}

interface IFacebookData {
    first_name: string
    email: string
}

const UserLoginContainer = styled(UserRegistrationContainer)``

const UserLogin: React.FC = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        emailError: '',
        passwordError: ''
    })
    const { email, password, emailError, passwordError } = form
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey: string, error: string) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/login'
                const response = await utils.apiAxios.post(url, {
                    email,
                    password
                })
                if (response) {
                    utils.redirectTo('/user/store')
                }
            } catch (error) {
                utils.apiValidation(error, errors =>
                    setForm(form => ({
                        ...form,
                        ...errors
                    }))
                )
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
        isValidated = hooks.useValidator(handleError).validateEmail(email)
        isValidated = hooks.useValidator(handleError).validatePassword(password, null, true)
        return isValidated
    }
    const loginWithFacebook = async (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        const url = '/api/user/loginWithFacebook'
        window.FB.login(
            ({ authResponse, status }: IFacebookResponse) => {
                if (authResponse && status === 'connected') {
                    window.FB.api(
                        '/me?fields=id,first_name,email',
                        async ({ first_name, email }: IFacebookData) => {
                            const response = await utils.apiAxios.post(url, {
                                name: first_name,
                                email,
                                access_token: authResponse.accessToken
                            })
                            if (response) {
                                utils.redirectTo('/user/store')
                            }
                        }
                    )
                } else {
                    utils.setFeedbackData(
                        'Logging to app',
                        'There was an unexpected problem logging in with Facebook'
                    )
                }
            },
            { scope: 'email,public_profile' }
        )
    }
    return (
        <UserLoginContainer>
            <URComposed.HomeButton />
            <URDashboard.Form onSubmit={submit}>
                <URComposed.Input
                    id="email"
                    label="Email"
                    type="text"
                    value={email}
                    placeholder="Type your email address..."
                    error={emailError}
                    onChange={e => {
                        onChange(e)
                        hooks.useValidator(handleError).validateEmail(e.target.value)
                    }}
                />
                <URComposed.Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={e => {
                        onChange(e)
                        hooks.useValidator(handleError).validatePassword(e.target.value, null, true)
                    }}
                />
                <URDashboard.Submit>Login</URDashboard.Submit>
                <URDashboard.Submit onClick={loginWithFacebook}>
                    Login with Facebook
                </URDashboard.Submit>
                <URDashboard.AnnotationsContainer>
                    <URDashboard.Annotation onClick={() => utils.redirectTo('/user/registration')}>
                        I don't have an account yet, go to registration page
                    </URDashboard.Annotation>
                    <URDashboard.Annotation
                        onClick={() => utils.redirectTo('/user/password-support')}
                    >
                        I forgot password
                    </URDashboard.Annotation>
                </URDashboard.AnnotationsContainer>
            </URDashboard.Form>
        </UserLoginContainer>
    )
}

export default UserLogin

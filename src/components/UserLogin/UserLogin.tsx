import React, { useState } from 'react'
import styled from 'styled-components/macro'
import validator from 'validator'

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
        expiresIn: number
        signedRequest: string
        userID: string
        grantedScopes?: string
        reauthorize_required_in?: number
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
        switch (true) {
            case !email.trim():
                isValidated = false
                handleError('email', 'Type your email address')
                break
            case !validator.isEmail(email):
                isValidated = false
                handleError('email', 'Type proper email address')
                break
        }
        switch (true) {
            case !password:
                isValidated = false
                handleError('password', 'Type your password')
                break
        }
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
                        'Logowanie',
                        'Wystąpił niespodziewany problem przy uwierzytelnianiu konta Facebook'
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
                    onChange={onChange}
                />
                <URComposed.Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={onChange}
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

import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { UserRegistrationContainer } from 'components/UserRegistration/UserRegistration'
import URDashboard from 'components/UserRegistration/styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

import utils from 'utils'

const UserLoginContainer = styled(UserRegistrationContainer)``

const UserLogin = () => {
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    })
    const { email, emailError, password, passwordError } = form
    const onChange = ({ target }) => setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey, error) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const validator = hooks.useValidator(handleError)
    const submit = async e => {
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
        isValidated = validator.validateEmail(email)
        isValidated = validator.validatePassword(password, undefined, true)
        return isValidated
    }
    const loginWithFacebook = async e => {
        e.preventDefault()
        const url = '/api/user/loginWithFacebook'
        window.FB.login(
            ({ authResponse, status }) => {
                if (authResponse && status === 'connected') {
                    return window.FB.api(
                        '/me?fields=id,first_name,email',
                        async ({ first_name, email }) => {
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
                }
                utils.setFeedbackData(
                    'Logging to app',
                    'There was an unexpected problem when logging in with Facebook'
                )
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
                        validator.validateEmail(e.target.value)
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
                        validator.validatePassword(e.target.value, undefined, true)
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

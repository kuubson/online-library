import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { HomeContainer } from 'components/Home/Home'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

export const UserRegistrationContainer = styled(HomeContainer)`
    height: initial;
    min-height: ${() => hooks.useHeight()};
    padding: 96px 0px 35px 0px;
`

const UserRegistration: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        repeatedPassword: '',
        nameError: '',
        emailError: '',
        passwordError: '',
        repeatedPasswordError: ''
    })
    const {
        name,
        email,
        password,
        repeatedPassword,
        nameError,
        emailError,
        passwordError,
        repeatedPasswordError
    } = form
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey: string, error: string) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/register'
                const response = await utils.apiAxios.post(url, {
                    name,
                    email,
                    password,
                    repeatedPassword
                })
                if (response) {
                    utils.setFeedbackData(
                        'Registration',
                        'An e-mail with an activation link has been sent to the email address provided. Open it and activate your account',
                        'Okey',
                        () => utils.redirectTo('/user/login')
                    )
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
            nameError: '',
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        }))
        isValidated = hooks.useValidator(handleError).validateName(name)
        isValidated = hooks.useValidator(handleError).validateEmail(email)
        isValidated = hooks.useValidator(handleError).validatePassword(password, repeatedPassword)
        isValidated = hooks
            .useValidator(handleError)
            .validateRepeatedPassword(repeatedPassword, password)
        return isValidated
    }
    return (
        <UserRegistrationContainer>
            <Composed.HomeButton />
            <Dashboard.Form onSubmit={submit}>
                <Composed.Input
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    placeholder="Type your name..."
                    error={nameError}
                    onChange={e => {
                        onChange(e)
                        hooks.useValidator(handleError).validateName(e.target.value)
                    }}
                />
                <Composed.Input
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
                <Composed.Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={e => {
                        onChange(e)
                        hooks
                            .useValidator(handleError)
                            .validatePassword(e.target.value, repeatedPassword)
                    }}
                />
                <Composed.Input
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatedPassword}
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChange={e => {
                        onChange(e)
                        hooks
                            .useValidator(handleError)
                            .validateRepeatedPassword(e.target.value, password)
                    }}
                />
                <Dashboard.Submit>Register</Dashboard.Submit>
                <Dashboard.AnnotationsContainer>
                    <Dashboard.Annotation onClick={() => utils.redirectTo('/user/email-support')}>
                        I haven't received the e-mail / activation link has expired
                    </Dashboard.Annotation>
                    <Dashboard.Annotation onClick={() => utils.redirectTo('/user/login')}>
                        I already have an account, go to login page
                    </Dashboard.Annotation>
                </Dashboard.AnnotationsContainer>
            </Dashboard.Form>
        </UserRegistrationContainer>
    )
}

export default UserRegistration

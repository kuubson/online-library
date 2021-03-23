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

const UserRegistration = () => {
    const [form, setForm] = useState({
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const {
        name,
        nameError,
        email,
        emailError,
        password,
        passwordError,
        repeatedPassword,
        repeatedPasswordError
    } = form
    const onChange = ({ target }) => setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey, error) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const validator = hooks.useValidator(handleError)
    const submit = async e => {
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
        !validator.validateProperty(
            'name',
            name,
            'Type your name',
            'Name contains invalid characters'
        ) && (isValidated = false)
        !validator.validateEmail(email) && (isValidated = false)
        !validator.validatePassword(password, repeatedPassword) && (isValidated = false)
        !validator.validateRepeatedPassword(repeatedPassword, password) && (isValidated = false)
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
                        validator.validateProperty(
                            'name',
                            e.target.value,
                            'Type your name',
                            'Name contains invalid characters'
                        )
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
                        validator.validateEmail(e.target.value)
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
                        validator.validatePassword(e.target.value, repeatedPassword)
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
                        validator.validateRepeatedPassword(e.target.value, password)
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

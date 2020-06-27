import React, { useState } from 'react'
import styled from 'styled-components/macro'
import validator from 'validator'

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
        nameError,
        email,
        emailError,
        password,
        passwordError,
        repeatedPassword,
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
                        'An email with an activation link has been sent to the e-mail address provided. Open it and activate your account',
                        'Okey',
                        () => utils.redirectTo('/login')
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
        switch (true) {
            case !name.trim():
                isValidated = false
                handleError('name', 'Type your name')
                break
            case utils.checkSanitization(name):
                isValidated = false
                handleError('name', 'Name contains invalid characters')
                break
        }
        switch (true) {
            case !email.trim():
                isValidated = false
                handleError('email', 'Type your e-mail address')
                break
            case !validator.isEmail(email):
                isValidated = false
                handleError('email', 'Type proper e-mail address')
                break
        }
        switch (true) {
            case !password:
                isValidated = false
                handleError('password', 'Type your password')
                break
            case !/(?=.{10,})/.test(password):
                isValidated = false
                handleError('password', 'Password must be at least 10 characters long')
                break
            case !/(?=.*[a-z])/.test(password):
                isValidated = false
                handleError('password', 'Password must contain at least one small letter')
                break
            case !/(?=.*[A-Z])/.test(password):
                isValidated = false
                handleError('password', 'Password must contain at least one big letter')
                break
            case !/(?=.*[0-9])/.test(password):
                isValidated = false
                handleError('password', 'Password must contain at least one digit')
                break
            case password !== repeatedPassword:
                isValidated = false
                handleError('repeatedPassword', 'Passwords are different')
                break
        }
        switch (true) {
            case !repeatedPassword:
                isValidated = false
                handleError('repeatedPassword', 'You have to type password twice')
                break
        }
        return isValidated
    }
    return (
        <UserRegistrationContainer>
            <Composed.ReturnButton />
            <Dashboard.Form onSubmit={submit}>
                <Composed.Input
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    placeholder="Type your name..."
                    error={nameError}
                    onChange={onChange}
                />
                <Composed.Input
                    id="email"
                    label="E-mail"
                    type="text"
                    value={email}
                    placeholder="Type your e-mail address..."
                    error={emailError}
                    onChange={onChange}
                />
                <Composed.Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={onChange}
                />
                <Composed.Input
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatedPassword}
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChange={onChange}
                />
                <Dashboard.Submit>Register</Dashboard.Submit>
            </Dashboard.Form>
        </UserRegistrationContainer>
    )
}

export default UserRegistration

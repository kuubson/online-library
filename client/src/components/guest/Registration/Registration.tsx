import React, { useState } from 'react'
import styled from 'styled-components'

import { HomeContainer } from 'components/guest/Home/Home'

import HomeButton from './modules/HomeButton'
import Input from './modules/Input'

import * as Styled from './styled'

import { useFormHandler } from 'hooks'

import { setApiFeedback, handleApiValidation } from 'helpers'

import { axios, history } from 'utils'

export const RegistrationContainer = styled(HomeContainer)`
    height: initial;
    min-height: 100%;
    padding: 96px 0px 35px 0px;
`

const Registration = () => {
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
    const formHandler = useFormHandler(setForm)
    const validate = () => {
        let isValidated = true
        setForm(form => ({
            ...form,
            nameError: '',
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        }))
        if (!formHandler.validateProperty('name', name)) isValidated = false
        if (!formHandler.validateEmail(email)) isValidated = false
        if (!formHandler.validatePassword(password, repeatedPassword, false)) isValidated = false
        if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) isValidated = false
        return isValidated
    }
    const register = async (event: React.FormEvent) => {
        event.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/auth/register'
                const response = await axios.post(url, {
                    name,
                    email,
                    password,
                    repeatedPassword
                })
                if (response) {
                    setApiFeedback(
                        'Account registration',
                        'An e-mail with an activation link has been sent to the email address provided. Open it and activate your account',
                        'Okey',
                        () => history.push('/login')
                    )
                }
            } catch (error) {
                handleApiValidation(error, setForm)
            }
        }
    }
    return (
        <RegistrationContainer>
            <HomeButton />
            <Styled.Form onSubmit={register}>
                <Input
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    placeholder="Type your name..."
                    error={nameError}
                    onChange={event => {
                        formHandler.handleInputValue(event)
                        formHandler.validateProperty('name', event.target.value)
                    }}
                />
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
                        formHandler.validatePassword(event.target.value, repeatedPassword, false)
                    }}
                />
                <Input
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatedPassword}
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChange={event => {
                        formHandler.handleInputValue(event)
                        formHandler.validateRepeatedPassword(event.target.value, password)
                    }}
                />
                <Styled.Submit>Register</Styled.Submit>
                <Styled.AnnotationsContainer>
                    <Styled.Annotation onClick={() => history.push('/email-support')}>
                        {"I haven't received the e-mail / activation link has expired"}
                    </Styled.Annotation>
                    <Styled.Annotation onClick={() => history.push('/login')}>
                        I already have an account, go to login page
                    </Styled.Annotation>
                </Styled.AnnotationsContainer>
            </Styled.Form>
        </RegistrationContainer>
    )
}

export default Registration

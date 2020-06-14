import React, { useState } from 'react'
import styled from 'styled-components'
import validator from 'validator'

import { UserRegistrationContainer } from '~components/UserRegistration/UserRegistration'
import URDashboard from '~components/UserRegistration/styled/Dashboard'

import URComposed from '~components/UserRegistration/composed'

import utils from '~utils'

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
        setForm(form => ({ ...form, [errorKey]: error }))
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
                }
            } catch (error) {
                utils.useApiValidation(error, errors =>
                    setForm({
                        ...form,
                        ...errors
                    })
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
                handleError('emailError', 'Type your e-mail address')
                break
            case !validator.isEmail(email):
                isValidated = false
                handleError('emailError', 'Type proper e-mail address')
                break
        }
        switch (true) {
            case !password:
                isValidated = false
                handleError('passwordError', 'Type your password')
                break
        }
        return isValidated
    }
    return (
        <UserLoginContainer>
            <URComposed.ReturnButton />
            <URDashboard.Form onSubmit={submit}>
                <URComposed.Input
                    id="email"
                    label="E-mail"
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
            </URDashboard.Form>
        </UserLoginContainer>
    )
}

export default UserLogin

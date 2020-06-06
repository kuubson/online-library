import React, { useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import validator from 'validator'

import { UserRegistrationContainer } from 'components/UserRegistration/UserRegistration'
import URDashboard from 'components/UserRegistration/styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

const UserLoginContainer = styled(UserRegistrationContainer)``

const UserLogin: React.FC = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        emailError: '',
        passwordError: ''
    })
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey: string, error: string) =>
        setForm(form => ({ ...form, [errorKey]: error }))
    const validate = () => {
        let isValidated = true
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: ''
        }))
        const { email, password } = form
        switch (true) {
            case !email.trim():
                isValidated = false
                handleError('emailError', 'Type your e-mail address!')
                break
            case !validator.isEmail(email):
                isValidated = false
                handleError('emailError', 'Type proper e-mail address!')
                break
        }
        switch (true) {
            case !password:
                isValidated = false
                handleError('passwordError', 'Type your password!')
                break
        }
        return isValidated
    }
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()) {
            const url = '/api/user/register'
            const { email, password } = form
            const response = await axios.post(url, {
                email,
                password
            })
            if (response) {
            }
        }
    }
    return (
        <UserLoginContainer>
            <URComposed.ReturnButton />
            <URDashboard.Form onSubmit={submit}>
                <URComposed.Input
                    id="email"
                    type="text"
                    label="E-mail"
                    placeholder="Type your email address..."
                    error={form.emailError}
                    onChange={onChange}
                />
                <URComposed.Input
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Type your password..."
                    error={form.passwordError}
                    onChange={onChange}
                />
                <URDashboard.Submit>Login</URDashboard.Submit>
            </URDashboard.Form>
        </UserLoginContainer>
    )
}

export default UserLogin

import React, { useState } from 'react'
import styled from 'styled-components/macro'
import validator from 'validator'

import { HomeContainer } from 'components/Home/Home'
import URDashboard from 'components/UserRegistration/styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

const UserLoginContainer = styled(HomeContainer)``

interface IForm {
    email: string
    password: string
    emailError: string
    passwordError: string
}

const UserLogin: React.FC = () => {
    const [form, setForm] = useState<IForm>({
        email: '',
        password: '',
        emailError: '',
        passwordError: ''
    })
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey: string, error: string) =>
        setForm(form => ({ ...form, [errorKey]: error }))
    const validate = (e: MouseEvent | TouchEvent) => {
        e.preventDefault()
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
    return (
        <UserLoginContainer>
            <URDashboard.Form>
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
                <URDashboard.Submit onClick={validate}>Login</URDashboard.Submit>
            </URDashboard.Form>
        </UserLoginContainer>
    )
}

export default UserLogin

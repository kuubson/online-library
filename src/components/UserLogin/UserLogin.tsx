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
    const validate = (e: MouseEvent | TouchEvent) => {
        e.preventDefault()
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: ''
        }))
        const { email, password } = form
        if (!email.trim()) {
            setForm(form => ({ ...form, emailError: 'Type your e-mail address!' }))
        }
        if (!validator.isEmail(email)) {
            setForm(form => ({ ...form, emailError: 'Type proper e-mail address!' }))
        }
        if (!password) {
            setForm(form => ({ ...form, passwordError: 'Type your password!' }))
        }
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

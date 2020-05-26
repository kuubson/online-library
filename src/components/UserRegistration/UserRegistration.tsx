import React, { useState } from 'react'
import styled from 'styled-components/macro'
import validator from 'validator'

import { HomeContainer } from 'components/Home/Home'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

const UserRegistrationContainer = styled(HomeContainer)`
    justify-content: center;
    flex-direction: column;
`

interface IForm {
    name: string
    email: string
    password: string
    repeatedPassword: string
    nameError: string
    emailError: string
    passwordError: string
    repeatedPasswordError: string
}

const UserRegistration: React.FC = () => {
    const [form, setForm] = useState<IForm>({
        name: '',
        email: '',
        password: '',
        repeatedPassword: '',
        nameError: '',
        emailError: '',
        passwordError: '',
        repeatedPasswordError: ''
    })
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const validate = (e: MouseEvent | TouchEvent) => {
        e.preventDefault()
        setForm(form => ({
            ...form,
            nameError: '',
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        }))
        const { name, email, password, repeatedPassword } = form
        if (!name.trim()) {
            setForm(form => ({ ...form, nameError: 'Type your name!' }))
        }
        if (utils.checkSanitization(name)) {
            setForm(form => ({ ...form, nameError: 'Name includes invalid characters!' }))
        }
        if (!email.trim()) {
            setForm(form => ({ ...form, emailError: 'Type your e-mail address!' }))
        }
        if (!validator.isEmail(email)) {
            setForm(form => ({ ...form, emailError: 'Type proper e-mail address!' }))
        }
        if (!password) {
            setForm(form => ({ ...form, passwordError: 'Type your password!' }))
        }
        if (password.length > 10) {
            setForm(form => ({
                ...form,
                passwordError: 'Password must be at least 10 characters long!'
            }))
        }
        if (!repeatedPassword) {
            setForm(form => ({
                ...form,
                repeatedPasswordError: 'You have to type password twice!'
            }))
        }
        if (password && password !== repeatedPassword) {
            setForm(form => ({
                ...form,
                repeatedPasswordError: 'Passwords are different!'
            }))
        }
    }
    return (
        <UserRegistrationContainer>
            <Dashboard.Form>
                <Composed.Input
                    id="name"
                    type="text"
                    label="Name"
                    placeholder="Type your name..."
                    error={form.nameError}
                    onChange={onChange}
                />
                <Composed.Input
                    id="email"
                    type="text"
                    label="E-mail"
                    placeholder="Type your email address..."
                    error={form.emailError}
                    onChange={onChange}
                />
                <Composed.Input
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Type your password..."
                    error={form.passwordError}
                    onChange={onChange}
                />
                <Composed.Input
                    id="repeatedPassword"
                    type="password"
                    label="Repeat Password"
                    placeholder="Type your password again..."
                    error={form.repeatedPasswordError}
                    onChange={onChange}
                />
                <Dashboard.Submit onClick={validate}>Register</Dashboard.Submit>
            </Dashboard.Form>
        </UserRegistrationContainer>
    )
}

export default UserRegistration

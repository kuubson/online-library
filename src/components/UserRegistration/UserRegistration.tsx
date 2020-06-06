import React, { useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import validator from 'validator'

import { HomeContainer } from 'components/Home/Home'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

const UserRegistrationContainer = styled(HomeContainer)`
    justify-content: center;
    flex-direction: column;
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
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey: string, error: string) =>
        setForm(form => ({ ...form, [errorKey]: error }))
    const validate = () => {
        let isValidated = true
        setForm(form => ({
            ...form,
            nameError: '',
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        }))
        const { name, email, password, repeatedPassword } = form
        switch (true) {
            case !name.trim():
                isValidated = false
                handleError('nameError', 'Type your name!')
                break
            case utils.checkSanitization(name):
                isValidated = false
                handleError('nameError', 'Name includes invalid characters!')
                break
        }
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
            case password.length < 10:
                isValidated = false
                handleError('passwordError', 'Password must be at least 10 characters long!')
                break
            case password !== repeatedPassword:
                isValidated = false
                handleError('repeatedPasswordError', 'Passwords are different!')
        }
        switch (true) {
            case !repeatedPassword:
                isValidated = false
                handleError('repeatedPasswordError', 'You have to type password twice!')
                break
        }
        return isValidated
    }
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()) {
            const url = '/api/user/register'
            const { name, email, password, repeatedPassword } = form
            const response = await axios.post(url, {
                name,
                email,
                password,
                repeatedPassword
            })
            if (response) {
            }
        }
    }
    return (
        <UserRegistrationContainer>
            <Dashboard.Form onSubmit={submit}>
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
                <Dashboard.Submit>Register</Dashboard.Submit>
            </Dashboard.Form>
        </UserRegistrationContainer>
    )
}

export default UserRegistration

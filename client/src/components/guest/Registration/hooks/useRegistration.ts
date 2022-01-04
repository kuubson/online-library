import { useState } from 'react'

import { useFormHandler } from 'hooks'

import { setApiFeedback, handleApiValidation } from 'helpers'

import { axios, history } from 'utils'

export const useRegistration = () => {
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
    const { name, email, password, repeatedPassword } = form
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
    return {
        form,
        formHandler,
        register
    }
}

import { useState } from 'react'

import { useFormHandler } from 'hooks'

import { setApiFeedback, handleApiValidation } from 'helpers'

import { axios, history } from 'utils'

export const useSupport = (withPasswordSupport: boolean | undefined) => {
    const [form, setForm] = useState({
        email: '',
        emailError: ''
    })
    const { email } = form
    const formHandler = useFormHandler(setForm)
    const validate = () => {
        let isValidated = true
        setForm(form => ({
            ...form,
            emailError: ''
        }))
        if (!formHandler.validateEmail(email)) isValidated = false
        return isValidated
    }
    const handleSupport = async (event: React.FormEvent) => {
        event.preventDefault()
        if (validate()) {
            try {
                const url = `/api/user/auth/${
                    withPasswordSupport ? 'recoverPassword' : 'resendEmail'
                }`
                const response = await axios.post(url, {
                    email
                })
                if (response) {
                    if (withPasswordSupport) {
                        return setApiFeedback(
                            'Password recovery',
                            'An e-mail with an password recovery link for your account has been sent',
                            'Okey',
                            () => history.push('/login')
                        )
                    }
                    setApiFeedback(
                        'E-mail resending',
                        'An e-mail with an activation link for your account has been resent',
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
        handleSupport
    }
}

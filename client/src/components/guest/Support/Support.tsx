import React, { useState } from 'react'
import styled from 'styled-components'

import { RegistrationContainer } from 'components/guest/Registration/Registration'

import HomeButton from 'components/guest/Registration/modules/HomeButton'
import Input from 'components/guest/Registration/modules/Input'

import * as StyledRegistration from 'components/guest/Registration/styled'

import { useFormHandler } from 'hooks'

import { setApiFeedback, handleApiValidation } from 'helpers'

import { axios, history } from 'utils'

const UserSupportContainer = styled(RegistrationContainer)``

interface ISupport {
    withPasswordSupport?: boolean
}

const Support: React.FC<ISupport> = ({ withPasswordSupport }) => {
    const [form, setForm] = useState({
        email: '',
        emailError: ''
    })
    const { email, emailError } = form
    const formHandler = useFormHandler(setForm)
    const handleOnSubmit = async (event: React.FormEvent) => {
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
    const validate = () => {
        let isValidated = true
        setForm(form => ({
            ...form,
            emailError: ''
        }))
        if (!formHandler.validateEmail(email)) isValidated = false
        return isValidated
    }
    return (
        <UserSupportContainer>
            <HomeButton withReturnButton />
            <StyledRegistration.Form onSubmit={handleOnSubmit}>
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
                <StyledRegistration.Submit>
                    {withPasswordSupport ? 'Recover password' : 'Resend e-mail'}
                </StyledRegistration.Submit>
            </StyledRegistration.Form>
        </UserSupportContainer>
    )
}

export default Support

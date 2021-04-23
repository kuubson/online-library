import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { UserRegistrationContainer } from 'components/UserRegistration/UserRegistration'

import URDashboard from 'components/UserRegistration/styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

import utils from 'utils'

const UserSupportContainer = styled(UserRegistrationContainer)``

const UserSupport = ({ withPasswordSupport }) => {
    const [form, setForm] = useState({
        email: '',
        emailError: ''
    })
    const { email, emailError } = form
    const handleOnChange = ({ target }) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey, error) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const validator = hooks.useValidator(handleError)
    const handleOnSubmit = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = `/api/user/${withPasswordSupport ? 'recoverPassword' : 'resendEmail'}`
                const response = await utils.apiAxios.post(url, {
                    email
                })
                if (response) {
                    if (withPasswordSupport) {
                        return utils.setFeedbackData(
                            'Password recovery',
                            'An e-mail with an password recovery link for your account has been sent',
                            'Okey',
                            () => utils.redirectTo('/user/login')
                        )
                    }
                    utils.setFeedbackData(
                        'E-mail resending',
                        'An e-mail with an activation link for your account has been resent',
                        'Okey',
                        () => utils.redirectTo('/user/login')
                    )
                }
            } catch (error) {
                utils.apiValidation(error, errors =>
                    setForm(form => ({
                        ...form,
                        ...errors
                    }))
                )
            }
        }
    }
    const validate = () => {
        let isValidated = true
        setForm(form => ({
            ...form,
            emailError: ''
        }))
        if (!validator.validateEmail(email)) isValidated = false
        return isValidated
    }
    return (
        <UserSupportContainer>
            <URComposed.HomeButton withGoBackButton />
            <URDashboard.Form onSubmit={handleOnSubmit}>
                <URComposed.Input
                    id="email"
                    label="Email"
                    type="text"
                    value={email}
                    placeholder="Type your email address..."
                    error={emailError}
                    onChange={e => {
                        handleOnChange(e)
                        validator.validateEmail(e.target.value)
                    }}
                />
                <URDashboard.Submit>
                    {withPasswordSupport ? 'Recover password' : 'Resend e-mail'}
                </URDashboard.Submit>
            </URDashboard.Form>
        </UserSupportContainer>
    )
}

export default UserSupport

import React, { useState } from 'react'
import styled from 'styled-components'
import { Actions } from 'react-native-router-flux'

import { API_URL } from '@env'

import hooks from 'hooks'

import { UserLoginContainer } from 'components/UserLogin/UserLogin'

import HDashboard from 'components/Home/styled/Dashboard'
import ULDashboard from 'components/UserLogin/styled/Dashboard'

import ULComposed from 'components/UserLogin/composed'

import utils from 'utils'

const UserSupportContainer = styled(UserLoginContainer)`
    justify-content: center;
`

const UserSupport = ({ withPasswordSupport }) => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({
        emailError: ''
    })
    const { emailError } = errors
    const handleError = (errorKey, error) =>
        setErrors(errors => ({ ...errors, [`${errorKey}Error`]: error }))
    const validator = hooks.useValidator(handleError)
    const submit = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = `${API_URL}/api/user/${
                    withPasswordSupport ? 'recoverPassword' : 'resendEmail'
                }`
                const response = await utils.apiAxios.post(url, {
                    email
                })
                if (response) {
                    if (withPasswordSupport) {
                        return utils.setFeedbackData(
                            'Password recovery',
                            'An e-mail with an password recovery link for your account has been sent',
                            'Okey',
                            () => Actions.UserLogin()
                        )
                    }
                    utils.setFeedbackData(
                        'E-mail resending',
                        'An e-mail with an activation link for your account has been resent',
                        'Okey',
                        () => Actions.UserLogin()
                    )
                }
            } catch (error) {
                utils.apiValidation(error, errors =>
                    setErrors(formErrors => ({
                        ...formErrors,
                        ...errors
                    }))
                )
            }
        }
    }
    const validate = () => {
        let isValidated = true
        setErrors({
            emailError: ''
        })
        if (!validator.validateEmail(email)) isValidated = false
        return isValidated
    }
    return (
        <UserSupportContainer>
            <ULDashboard.Inputs>
                <ULComposed.Input
                    label="Email"
                    value={email}
                    placeholder="Type your email address..."
                    error={emailError}
                    onChangeText={email => {
                        setEmail(email)
                        validator.validateEmail(email)
                    }}
                />
            </ULDashboard.Inputs>
            <HDashboard.Buttons>
                <ULDashboard.Button onPress={submit}>
                    <HDashboard.ButtonText>
                        {withPasswordSupport ? 'Recover password' : 'Resend e-mail'}
                    </HDashboard.ButtonText>
                </ULDashboard.Button>
            </HDashboard.Buttons>
        </UserSupportContainer>
    )
}

export default UserSupport

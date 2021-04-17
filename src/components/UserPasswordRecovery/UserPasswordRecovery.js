import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { UserRegistrationContainer } from 'components/UserRegistration/UserRegistration'
import URDashboard from 'components/UserRegistration/styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

import utils from 'utils'

export const UserPasswordRecoveryContainer = styled(UserRegistrationContainer)``

const UserPasswordRecovery = () => {
    const { passwordToken } = hooks.useParams()
    const [form, setForm] = useState({
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const { password, passwordError, repeatedPassword, repeatedPasswordError } = form
    useEffect(() => {
        const checkPasswordToken = async () => {
            try {
                const url = '/api/user/checkPasswordToken'
                await utils.apiAxios.post(url, {
                    passwordToken
                })
            } catch (error) {
                utils.redirectTo('/user/login')
            }
        }
        checkPasswordToken()
    }, [])
    const handleOnChange = ({ target }) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey, error) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const submit = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/changePassword'
                const response = await utils.apiAxios.post(url, {
                    password,
                    repeatedPassword,
                    passwordToken
                })
                if (response) {
                    utils.setFeedbackData(
                        'Password Recovery',
                        'Your password has been successfully changed, you can login now',
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
            passwordError: '',
            repeatedPasswordError: ''
        }))
        !hooks.useValidator(handleError).validatePassword(password, repeatedPassword) &&
            (isValidated = false)
        !hooks.useValidator(handleError).validateRepeatedPassword(repeatedPassword, password) &&
            (isValidated = false)
        return isValidated
    }
    return (
        <UserPasswordRecoveryContainer>
            <URComposed.HomeButton />
            <URDashboard.Form onSubmit={submit}>
                <URComposed.Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={e => {
                        handleOnChange(e)
                        hooks
                            .useValidator(handleError)
                            .validatePassword(e.target.value, repeatedPassword)
                    }}
                />
                <URComposed.Input
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatedPassword}
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChange={e => {
                        handleOnChange(e)
                        hooks
                            .useValidator(handleError)
                            .validateRepeatedPassword(e.target.value, password)
                    }}
                />
                <URDashboard.Submit>Change password</URDashboard.Submit>
            </URDashboard.Form>
        </UserPasswordRecoveryContainer>
    )
}

export default UserPasswordRecovery

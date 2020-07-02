import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { UserRegistrationContainer } from 'components/UserRegistration/UserRegistration'
import URDashboard from 'components/UserRegistration/styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

import utils from 'utils'

export const UserPasswordRecoveryContainer = styled(UserRegistrationContainer)``

const UserPasswordRecovery: React.FC = () => {
    const { passwordToken } = hooks.useParams()
    const [form, setForm] = useState({
        password: '',
        repeatedPassword: '',
        passwordError: '',
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
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setForm(form => ({ ...form, [target.name]: target.value }))
    const handleError = (errorKey: string, error: string) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        switch (true) {
            case !password:
                isValidated = false
                handleError('password', 'Type your password')
                break
            case !/(?=.{10,})/.test(password):
                isValidated = false
                handleError('password', 'Password must be at least 10 characters long')
                break
            case !/(?=.*[a-z])/.test(password):
                isValidated = false
                handleError('password', 'Password must contain at least one small letter')
                break
            case !/(?=.*[A-Z])/.test(password):
                isValidated = false
                handleError('password', 'Password must contain at least one big letter')
                break
            case !/(?=.*[0-9])/.test(password):
                isValidated = false
                handleError('password', 'Password must contain at least one digit')
                break
            case password !== repeatedPassword:
                isValidated = false
                handleError('repeatedPassword', 'Passwords are different')
                break
        }
        switch (true) {
            case !repeatedPassword:
                isValidated = false
                handleError('repeatedPassword', 'You have to type password twice')
                break
        }
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
                    onChange={onChange}
                />
                <URComposed.Input
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatedPassword}
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChange={onChange}
                />
                <URDashboard.Submit>Change password</URDashboard.Submit>
            </URDashboard.Form>
        </UserPasswordRecoveryContainer>
    )
}

export default UserPasswordRecovery

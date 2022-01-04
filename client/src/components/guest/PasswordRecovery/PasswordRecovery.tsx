import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import { RegistrationContainer } from 'components/guest/Registration/Registration'

import HomeButton from 'components/guest/Registration/modules/HomeButton'
import Input from 'components/guest/Registration/modules/Input'

import * as StyledRegistration from 'components/guest/Registration/styled'

import { useQueryParams, useFormHandler } from 'hooks'

import { setApiFeedback, handleApiValidation } from 'helpers'

import { axios, history } from 'utils'

const UserPasswordRecoveryContainer = styled(RegistrationContainer)``

const UserPasswordRecovery = () => {
    const { passwordToken } = useQueryParams()
    const [form, setForm] = useState({
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const { password, passwordError, repeatedPassword, repeatedPasswordError } = form
    const formHandler = useFormHandler(setForm)
    useEffect(() => {
        const checkPasswordToken = async () => {
            try {
                const url = '/api/user/auth/checkPasswordToken'
                await axios.post(url, {
                    passwordToken
                })
            } catch (error) {
                history.push('/user/login')
            }
        }
        checkPasswordToken()
    }, [])
    const handleOnSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/auth/changePassword'
                const response = await axios.post(url, {
                    password,
                    repeatedPassword,
                    passwordToken
                })
                if (response) {
                    setApiFeedback(
                        'Password Recovery',
                        'Your password has been successfully changed, you can login now',
                        'Okey',
                        () => history.push('/user/login')
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
            passwordError: '',
            repeatedPasswordError: ''
        }))
        if (!formHandler.validatePassword(password, repeatedPassword, false)) isValidated = false
        if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) isValidated = false
        return isValidated
    }
    return (
        <UserPasswordRecoveryContainer>
            <HomeButton />
            <StyledRegistration.Form onSubmit={handleOnSubmit}>
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={event => {
                        formHandler.handleInputValue(event)
                        formHandler.validatePassword(event.target.value, repeatedPassword, false)
                    }}
                />
                <Input
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatedPassword}
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChange={event => {
                        formHandler.handleInputValue(event)
                        formHandler.validateRepeatedPassword(event.target.value, password)
                    }}
                />
                <StyledRegistration.Submit>Change password</StyledRegistration.Submit>
            </StyledRegistration.Form>
        </UserPasswordRecoveryContainer>
    )
}

export default UserPasswordRecovery

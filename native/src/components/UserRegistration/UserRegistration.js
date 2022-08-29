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

const RegistrationContainer = styled(UserLoginContainer)`
    padding-bottom: ${utils.scale(35)}px;
`

const UserRegistration = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
        repeatedPasswordError: ''
    })
    const { nameError, emailError, passwordError, repeatedPasswordError } = errors
    const handleError = (errorKey, error) =>
        setErrors(errors => ({ ...errors, [`${errorKey}Error`]: error }))
    const validator = hooks.useValidator(handleError)
    const submit = async () => {
        if (validate()) {
            try {
                const url = `${API_URL}/api/user/register`
                const response = await utils.apiAxios.post(url, {
                    name,
                    email,
                    password,
                    repeatedPassword
                })
                if (response) {
                    utils.setFeedbackData(
                        'Account registration',
                        'An e-mail with an activation link has been sent to the email address provided. Open it and activate your account',
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
            nameError: '',
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        })
        if (
            !validator.validateProperty(
                'name',
                name,
                'Type your name',
                'Name contains invalid characters'
            )
        ) {
            isValidated = false
        }
        if (!validator.validateEmail(email)) isValidated = false
        if (!validator.validatePassword(password, repeatedPassword)) isValidated = false
        if (!validator.validateRepeatedPassword(repeatedPassword, password)) isValidated = false
        return isValidated
    }
    return (
        <RegistrationContainer>
            <ULDashboard.Inputs>
                <ULComposed.Input
                    label="Name"
                    value={name}
                    placeholder="Type your name..."
                    error={nameError}
                    onChangeText={name => {
                        setName(name)
                        validator.validateProperty(
                            'name',
                            name,
                            'Type your name',
                            'Name contains invalid characters'
                        )
                    }}
                />
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
                <ULComposed.Input
                    label="Password"
                    value={password}
                    secureTextEntry
                    placeholder="Type your password..."
                    error={passwordError}
                    onChangeText={password => {
                        setPassword(password)
                        validator.validatePassword(password, repeatedPassword)
                    }}
                />
                <ULComposed.Input
                    label="Repeat Password"
                    value={repeatedPassword}
                    secureTextEntry
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChangeText={repeatedPassword => {
                        setRepeatedPassword(repeatedPassword)
                        validator.validateRepeatedPassword(repeatedPassword, password)
                    }}
                    moreMarginBottom
                />
            </ULDashboard.Inputs>
            <HDashboard.Buttons>
                <ULDashboard.Button onPress={submit}>
                    <HDashboard.ButtonText>Register</HDashboard.ButtonText>
                </ULDashboard.Button>
            </HDashboard.Buttons>
            <ULDashboard.Annotations>
                <ULDashboard.AnnotationContainer>
                    <ULDashboard.Annotation onPress={() => Actions.UserEmailSupport()}>
                        I haven't received the e-mail / activation link has expired
                    </ULDashboard.Annotation>
                </ULDashboard.AnnotationContainer>
                <ULDashboard.AnnotationContainer>
                    <ULDashboard.Annotation onPress={() => Actions.UserLogin()} noMargin>
                        I already have an account, go to login page
                    </ULDashboard.Annotation>
                </ULDashboard.AnnotationContainer>
            </ULDashboard.Annotations>
        </RegistrationContainer>
    )
}

export default UserRegistration

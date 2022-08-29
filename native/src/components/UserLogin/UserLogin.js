import React, { useState } from 'react'
import styled from 'styled-components'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'

import { API_URL } from '@env'

import hooks from 'hooks'

import HDashboard from 'components/Home/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

export const UserLoginContainer = styled.View`
    padding: ${utils.scale(25)}px;
    flex: 1;
    justify-content: space-around;
    align-items: center;
`

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: ''
    })
    const { emailError, passwordError } = errors
    const handleError = (errorKey, error) =>
        setErrors(errors => ({ ...errors, [`${errorKey}Error`]: error }))
    const validator = hooks.useValidator(handleError)
    const submit = async () => {
        if (validate()) {
            try {
                const url = `${API_URL}/api/user/login`
                const response = await utils.apiAxios.post(url, {
                    email,
                    password
                })
                if (response) {
                    Actions.reset('User')
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
            emailError: '',
            passwordError: ''
        })
        if (!validator.validateEmail(email)) isValidated = false
        if (!validator.validatePassword(password, undefined, true)) isValidated = false
        return isValidated
    }
    const loginWithFacebook = async () => {
        const url = `${API_URL}/api/user/loginWithFacebook`
        LoginManager.logInWithPermissions(['email', 'public_profile']).then(
            login => {
                if (login.isCancelled) {
                    utils.setFeedbackData(
                        'Logging to app',
                        'There was an unexpected problem when logging in with Facebook'
                    )
                } else {
                    AccessToken.getCurrentAccessToken().then(async data => {
                        const accessToken = data.accessToken.toString()
                        const PROFILE_REQUEST_PARAMS = {
                            fields: {
                                string: 'id,first_name,email'
                            }
                        }
                        const profileRequest = new GraphRequest(
                            '/me',
                            { token: accessToken, parameters: PROFILE_REQUEST_PARAMS },
                            async (error, { first_name, email, isCancelled }) => {
                                if (error) {
                                    utils.setFeedbackData(
                                        'Logging to app',
                                        'There was an unexpected problem when logging in with Facebook'
                                    )
                                } else {
                                    if (isCancelled) {
                                        utils.setFeedbackData(
                                            'Logging to app',
                                            'There was an unexpected problem when logging in with Facebook'
                                        )
                                    }
                                    const response = await utils.apiAxios.post(url, {
                                        name: first_name,
                                        email,
                                        access_token: accessToken
                                    })
                                    if (response) {
                                        Actions.reset('User')
                                    }
                                }
                            }
                        )
                        new GraphRequestManager().addRequest(profileRequest).start()
                    })
                }
            },
            () => {
                utils.setFeedbackData(
                    'Logging to app',
                    'There was an unexpected problem when logging in with Facebook'
                )
            }
        )
    }
    return (
        <UserLoginContainer>
            <Dashboard.Inputs>
                <Composed.Input
                    label="Email"
                    value={email}
                    placeholder="Type your email address..."
                    error={emailError}
                    onChangeText={email => {
                        setEmail(email)
                        validator.validateEmail(email)
                    }}
                />
                <Composed.Input
                    label="Password"
                    value={password}
                    secureTextEntry
                    placeholder="Type your password..."
                    error={passwordError}
                    onChangeText={password => {
                        setPassword(password)
                        validator.validatePassword(password, undefined, true)
                    }}
                />
            </Dashboard.Inputs>
            <HDashboard.Buttons>
                <Dashboard.Button onPress={submit}>
                    <HDashboard.ButtonText>Login</HDashboard.ButtonText>
                </Dashboard.Button>
                <Dashboard.Button onPress={loginWithFacebook} withFacebook>
                    <HDashboard.ButtonText>Login with Facebook</HDashboard.ButtonText>
                </Dashboard.Button>
            </HDashboard.Buttons>
            <Dashboard.Annotations>
                <Dashboard.AnnotationContainer onPress={() => Actions.UserRegistration()}>
                    <Dashboard.Annotation>
                        I don't have an account yet, go to registration page
                    </Dashboard.Annotation>
                </Dashboard.AnnotationContainer>
                <Dashboard.AnnotationContainer>
                    <Dashboard.Annotation onPress={() => Actions.UserPasswordSupport()} noMargin>
                        I forgot password
                    </Dashboard.Annotation>
                </Dashboard.AnnotationContainer>
            </Dashboard.Annotations>
        </UserLoginContainer>
    )
}

export default UserLogin

import styled from 'styled-components'

import { RegistrationContainer } from 'components/guest/Registration/Registration'

import HomeButton from 'components/guest/Registration/modules/HomeButton'
import Input from 'components/guest/Registration/modules/Input'

import * as StyledRegistration from 'components/guest/Registration/styled'

import { useLogin } from './hooks'

import { history } from 'utils'

const LoginContainer = styled(RegistrationContainer)``

const Login = () => {
    const {
        form: { email, emailError, password, passwordError },
        formHandler: { handleInputValue, validateEmail, validatePassword },
        login,
        loginWithFacebook
    } = useLogin()
    return (
        <LoginContainer>
            <HomeButton />
            <StyledRegistration.Form onSubmit={login}>
                <Input
                    id="email"
                    label="Email"
                    type="text"
                    value={email}
                    placeholder="Type your email address..."
                    error={emailError}
                    onChange={event => {
                        handleInputValue(event)
                        validateEmail(event.target.value)
                    }}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={event => {
                        handleInputValue(event)
                        validatePassword(event.target.value, '', true)
                    }}
                />
                <StyledRegistration.Submit>Login</StyledRegistration.Submit>
                <StyledRegistration.Submit onClick={loginWithFacebook} withFacebook>
                    Login with Facebook
                </StyledRegistration.Submit>
                <StyledRegistration.AnnotationsContainer>
                    <StyledRegistration.Annotation onClick={() => history.push('/registration')}>
                        {"I don't have an account yet, go to registration page"}
                    </StyledRegistration.Annotation>
                    <StyledRegistration.Annotation
                        onClick={() => history.push('/password-support')}
                    >
                        I forgot password
                    </StyledRegistration.Annotation>
                </StyledRegistration.AnnotationsContainer>
            </StyledRegistration.Form>
        </LoginContainer>
    )
}

export default Login

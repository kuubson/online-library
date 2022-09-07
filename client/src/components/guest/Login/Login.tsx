import styled from 'styled-components/macro'

import { RegistrationContainer } from 'components/guest/Registration/Registration'
import { HomeButton, Input } from 'components/guest/Registration/modules'
import * as StyledRegistration from 'components/guest/Registration/styled'

import { useLogin } from './hooks'

import { history } from 'utils'

export const Login = () => {
   const { login, loginWithFacebook, control, errors } = useLogin()
   return (
      <LoginContainer>
         <HomeButton />
         <StyledRegistration.Form onSubmit={login}>
            <Input
               {...{ control }}
               id="email"
               label="Email"
               type="text"
               placeholder="Type your email address..."
               error={errors.email?.message}
            />
            <Input
               {...{ control }}
               id="password"
               label="Password"
               type="password"
               placeholder="Type your password..."
               error={errors.password?.message}
            />
            <StyledRegistration.Submit>Login</StyledRegistration.Submit>
            <StyledRegistration.Submit onClick={loginWithFacebook} withFacebook>
               Login with Facebook
            </StyledRegistration.Submit>
            <StyledRegistration.AnnotationsContainer>
               <StyledRegistration.Annotation onClick={() => history.push('/registration')}>
                  {"I don't have an account yet, go to registration page"}
               </StyledRegistration.Annotation>
               <StyledRegistration.Annotation onClick={() => history.push('/password-support')}>
                  I forgot password
               </StyledRegistration.Annotation>
            </StyledRegistration.AnnotationsContainer>
         </StyledRegistration.Form>
      </LoginContainer>
   )
}

const LoginContainer = styled(RegistrationContainer)``

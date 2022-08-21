import styled from 'styled-components/macro'

import * as Styled from './styled'

import { HomeContainer } from 'components/guest/Home/Home'

import { HomeButton, Input } from './modules'

import { useRegistration } from './hooks'

import { history } from 'utils'

export const Registration = () => {
   const {
      form: {
         name,
         nameError,
         email,
         emailError,
         password,
         passwordError,
         repeatedPassword,
         repeatedPasswordError,
      },
      formHandler: {
         handleInputValue,
         validateProperty,
         validateEmail,
         validatePassword,
         validateRepeatedPassword,
      },
      register,
   } = useRegistration()
   return (
      <RegistrationContainer>
         <HomeButton />
         <Styled.Form onSubmit={register}>
            <Input
               id="name"
               label="Name"
               type="text"
               value={name}
               placeholder="Type your name..."
               error={nameError}
               onChange={event => {
                  handleInputValue(event)
                  validateProperty('name', event.target.value)
               }}
            />
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
                  validatePassword(event.target.value, repeatedPassword, false)
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
                  handleInputValue(event)
                  validateRepeatedPassword(event.target.value, password)
               }}
            />
            <Styled.Submit>Register</Styled.Submit>
            <Styled.AnnotationsContainer>
               <Styled.Annotation onClick={() => history.push('/email-support')}>
                  {"I haven't received the e-mail / activation link has expired"}
               </Styled.Annotation>
               <Styled.Annotation onClick={() => history.push('/login')}>
                  I already have an account, go to login page
               </Styled.Annotation>
            </Styled.AnnotationsContainer>
         </Styled.Form>
      </RegistrationContainer>
   )
}

export const RegistrationContainer = styled(HomeContainer)`
   height: initial;
   min-height: 100%;
   padding: 96px 0px 35px 0px;
`

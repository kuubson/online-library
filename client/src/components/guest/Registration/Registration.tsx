import styled from 'styled-components/macro'

import * as Styled from './styled'

import { HomeContainer } from 'components/guest/Home/Home'

import { HomeButton, Input } from './modules'

import { useRegistration } from './hooks'

import { history } from 'utils'

export const Registration = () => {
   const { register, control, errors } = useRegistration()
   return (
      <RegistrationContainer>
         <HomeButton />
         <Styled.Form onSubmit={register}>
            <Input
               {...{ control }}
               id="name"
               label="Name"
               type="text"
               placeholder="Type your name..."
               error={errors.name?.message}
            />
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
            <Input
               {...{ control }}
               id="repeatedPassword"
               label="Repeat Password"
               type="password"
               placeholder="Type your password again..."
               error={errors.repeatedPassword?.message}
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

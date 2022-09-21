import { Annotation, Annotations } from 'components/guest/Registration/styled'
import { Form, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

import { useLogin } from './hooks'

import { history } from 'utils'

export const Login = () => {
   const { loginWithCredentials, loginWithFb, control, errors } = useLogin()
   return (
      <>
         <HomeButton />
         <Form onSubmit={event => event.preventDefault()}>
            <Input
               {...{ control }}
               id="email"
               label="Email"
               type="text"
               placeholder="Enter email address..."
               error={errors.email?.message}
            />
            <Input
               {...{ control }}
               id="password"
               label="Password"
               type="password"
               placeholder="Enter password..."
               error={errors.password?.message}
            />
            <Submit onClick={loginWithCredentials}>Login</Submit>
            <Submit onClick={loginWithFb} withFacebook>
               Login with Facebook
            </Submit>
            <Annotations>
               <Annotation onClick={() => history.push('/registration')}>
                  {"I don't have an account yet, go to registration page"}
               </Annotation>
               <Annotation onClick={() => history.push('/password-support')}>
                  I forgot password
               </Annotation>
            </Annotations>
         </Form>
      </>
   )
}

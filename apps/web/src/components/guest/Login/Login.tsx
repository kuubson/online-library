import { history, useLogin } from '@online-library/core'

import { t } from '@online-library/locales'

import { Annotation, Annotations } from 'components/guest/Registration/styled'
import { Form, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

export const Login = () => {
   const { loginWithCredentials, loginWithFb, control, errors } = useLogin()
   return (
      <>
         <HomeButton />
         <Form onSubmit={event => event.preventDefault()}>
            <Input
               {...{ control }}
               id="email"
               label={t('guest.login.inputs.email.label')}
               type="text"
               placeholder={t('guest.login.inputs.email.placeholder')}
               error={errors.email?.message}
            />
            <Input
               {...{ control }}
               id="password"
               label={t('guest.login.inputs.password.label')}
               type="password"
               placeholder={t('guest.login.inputs.password.placeholder')}
               error={errors.password?.message}
            />
            <Submit onClick={loginWithCredentials}>Login</Submit>
            <Submit onClick={loginWithFb} withFacebook>
               Login with Facebook
            </Submit>
            <Annotations>
               <Annotation onClick={() => history.push('/registration')}>
                  {t('guest.login.annotation1')}
               </Annotation>
               <Annotation onClick={() => history.push('/password-support')}>
                  {t('guest.login.annotation2')}
               </Annotation>
            </Annotations>
         </Form>
      </>
   )
}

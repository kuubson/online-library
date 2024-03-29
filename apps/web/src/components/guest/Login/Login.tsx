import { TEST_USER } from '@online-library/config'

import { t } from '@online-library/core'

import { useLogin } from '@online-library/logic'

import { Form, Submit } from 'styles/styled'

import { Annotation, Annotations } from 'components/guest/Registration/styled'

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
               label={`${t('inputs.email.label')} (${TEST_USER.email})`}
               type="text"
               placeholder={t('inputs.email.placeholder')}
               error={errors.email?.message}
            />
            <Input
               {...{ control }}
               id="password"
               label={`${t('inputs.password.label')} (${TEST_USER.password})`}
               type="password"
               placeholder={t('inputs.password.placeholder')}
               error={errors.password?.message}
            />
            <Submit onClick={loginWithCredentials}>{t('buttons.login')}</Submit>
            <Submit onClick={loginWithFb} withFacebook>
               {t('buttons.fbLogin')}
            </Submit>
            <Annotations>
               <Annotation onClick={() => window.navigate('/registration')}>
                  {t('login.annotation1')}
               </Annotation>
               <Annotation onClick={() => window.navigate('/password-support')}>
                  {t('login.annotation2')}
               </Annotation>
            </Annotations>
         </Form>
      </>
   )
}

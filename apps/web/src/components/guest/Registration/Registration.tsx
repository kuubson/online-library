import { history, t } from '@online-library/core'

import { useRegistration } from '@online-library/logic'

import * as Styled from './styled'
import { Form, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

export const Registration = () => {
   const { register, control, errors } = useRegistration()
   return (
      <>
         <HomeButton />
         <Form onSubmit={register}>
            <Input
               {...{ control }}
               id="name"
               label={t('guest.registration.inputs.name.label')}
               type="text"
               placeholder={t('guest.registration.inputs.name.placeholder')}
               error={errors.name?.message}
            />
            <Input
               {...{ control }}
               id="email"
               label={t('guest.registration.inputs.email.label')}
               type="text"
               placeholder={t('guest.registration.inputs.email.placeholder')}
               error={errors.email?.message}
            />
            <Input
               {...{ control }}
               id="password"
               label={t('guest.registration.inputs.password.label')}
               type="password"
               placeholder={t('guest.registration.inputs.password.placeholder')}
               error={errors.password?.message}
            />
            <Input
               {...{ control }}
               id="repeatedPassword"
               label={t('guest.registration.inputs.repeatedPassword.label')}
               type="password"
               placeholder={t('guest.registration.inputs.repeatedPassword.placeholder')}
               error={errors.repeatedPassword?.message}
            />
            <Submit>Register</Submit>
            <Styled.Annotations>
               <Styled.Annotation onClick={() => history.push('/email-support')}>
                  {t('guest.registration.annotation1')}
               </Styled.Annotation>
               <Styled.Annotation onClick={() => history.push('/login')}>
                  {t('guest.registration.annotation2')}
               </Styled.Annotation>
            </Styled.Annotations>
         </Form>
      </>
   )
}

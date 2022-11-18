import { history, t } from '@online-library/core'

import { useRegistration } from '@online-library/logic'

import { Form, Submit } from 'styles/styled'

import * as Styled from './styled'

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
               label={t('inputs.name.label')}
               type="text"
               placeholder={t('inputs.name.placeholder')}
               error={errors.name?.message}
            />
            <Input
               {...{ control }}
               id="email"
               label={t('inputs.email.label')}
               type="text"
               placeholder={t('inputs.email.placeholder')}
               error={errors.email?.message}
            />
            <Input
               {...{ control }}
               id="password"
               label={t('inputs.password.label')}
               type="password"
               placeholder={t('inputs.password.placeholder')}
               error={errors.password?.message}
            />
            <Input
               {...{ control }}
               id="repeatedPassword"
               label={t('inputs.repeatedPassword.label')}
               type="password"
               placeholder={t('inputs.repeatedPassword.placeholder')}
               error={errors.repeatedPassword?.message}
            />
            <Submit>{t('buttons.register')}</Submit>
            <Styled.Annotations>
               <Styled.Annotation onClick={() => history.push('/email-support')}>
                  {t('registration.annotation1')}
               </Styled.Annotation>
               <Styled.Annotation onClick={() => history.push('/login')}>
                  {t('registration.annotation2')}
               </Styled.Annotation>
            </Styled.Annotations>
         </Form>
      </>
   )
}

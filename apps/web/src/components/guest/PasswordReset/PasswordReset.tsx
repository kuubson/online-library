import { t } from '@online-library/core'

import { Form, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

import { usePasswordReset } from './hooks'

export const PasswordReset = () => {
   const { changePassword, control, errors } = usePasswordReset()
   return (
      <>
         <HomeButton />
         <Form onSubmit={changePassword}>
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
            <Submit>{t('buttons.changePassword')}</Submit>
         </Form>
      </>
   )
}

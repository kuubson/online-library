import { t, useSupport } from '@online-library/ui'

import { Form, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

type SupportProps = {
   withPasswordSupport?: boolean
}

export const Support = ({ withPasswordSupport }: SupportProps) => {
   const { handleSupport, control, errors } = useSupport(withPasswordSupport)
   return (
      <>
         <HomeButton withReturnButton />
         <Form onSubmit={handleSupport}>
            <Input
               {...{ control }}
               id="email"
               label={t('guest.support.inputs.email.label')}
               type="text"
               placeholder={t('guest.support.inputs.email.placeholder')}
               error={errors.email?.message}
            />
            <Submit>
               {withPasswordSupport
                  ? t('guest.support.password.button')
                  : t('guest.support.email.button')}
            </Submit>
         </Form>
      </>
   )
}

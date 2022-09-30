import { t } from '@online-library/core'

import { useSupport } from '@online-library/logic'

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
               label={t('inputs.email.label')}
               type="text"
               placeholder={t('inputs.email.placeholder')}
               error={errors.email?.message}
            />
            <Submit>
               {withPasswordSupport ? t('buttons.recoverPassword') : t('buttons.resendEmail')}
            </Submit>
         </Form>
      </>
   )
}

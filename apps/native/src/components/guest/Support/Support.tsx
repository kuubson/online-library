import { t } from '@online-library/core'

import { useSupport } from '@online-library/logic'

import { Submit, Text } from 'components/shared/styled'

import { Input } from 'components/shared'

type SupportProps = {
   withPasswordSupport?: boolean
}

export const Support = ({ withPasswordSupport }: SupportProps) => {
   const { handleSupport, control, errors } = useSupport(withPasswordSupport)
   return (
      <>
         <Input
            {...{ control }}
            id="email"
            label={t('inputs.email.label')}
            type="text"
            placeholder={t('inputs.email.placeholder')}
            error={errors.email?.message}
         />
         <Submit onPress={handleSupport}>
            <Text>
               {withPasswordSupport ? t('buttons.recoverPassword') : t('buttons.resendEmail')}
            </Text>
         </Submit>
      </>
   )
}

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
            label={t('guest.support.inputs.email.label')}
            type="text"
            placeholder={t('guest.support.inputs.email.placeholder')}
            error={errors.email?.message}
         />
         <Submit onPress={handleSupport}>
            <Text>
               {withPasswordSupport
                  ? t('guest.support.password.button')
                  : t('guest.support.email.button')}
            </Text>
         </Submit>
      </>
   )
}

import { navigate, t } from '@online-library/core'

import { useRegistration } from '@online-library/logic'

import * as Styled from './styled'
import { Submit, Text } from 'components/shared/styled'

import { Input } from 'components/shared'

export const Registration = () => {
   const { register, control, errors } = useRegistration()
   return (
      <>
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
            secureTextEntry
         />
         <Input
            {...{ control }}
            id="repeatedPassword"
            label={t('inputs.repeatedPassword.label')}
            type="password"
            placeholder={t('inputs.repeatedPassword.placeholder')}
            error={errors.repeatedPassword?.message}
            secureTextEntry
         />
         <Submit onPress={register}>
            <Text>{t('buttons.register')}</Text>
         </Submit>
         <Styled.Annotations>
            <Styled.AnnotationContainer>
               <Styled.Annotation onPress={() => navigate('EmailSupport')}>
                  {t('registration.annotation1')}
               </Styled.Annotation>
            </Styled.AnnotationContainer>
         </Styled.Annotations>
      </>
   )
}

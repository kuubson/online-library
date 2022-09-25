import { navigate } from '@online-library/core'

import { t, useRegistration } from '@online-library/ui'

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
            secureTextEntry
         />
         <Input
            {...{ control }}
            id="repeatedPassword"
            label={t('guest.registration.inputs.repeatedPassword.label')}
            type="password"
            placeholder={t('guest.registration.inputs.repeatedPassword.placeholder')}
            error={errors.repeatedPassword?.message}
            secureTextEntry
         />
         <Submit onPress={register}>
            <Text>Register</Text>
         </Submit>
         <Styled.Annotations>
            <Styled.AnnotationContainer>
               <Styled.Annotation onClick={() => navigate('EmailSupport')}>
                  {t('guest.registration.annotation1')}
               </Styled.Annotation>
            </Styled.AnnotationContainer>
            <Styled.AnnotationContainer>
               <Styled.Annotation onClick={() => navigate('Login')} noMargin>
                  {t('guest.registration.annotation2')}
               </Styled.Annotation>
            </Styled.AnnotationContainer>
         </Styled.Annotations>
      </>
   )
}

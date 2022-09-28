import { navigate } from '@online-library/core'

import { t, useLogin } from '@online-library/ui'

import { Annotation, AnnotationContainer, Annotations } from 'components/guest/Registration/styled'
import { Submit, Text } from 'components/shared/styled'

import { Input } from 'components/shared'

import { useFbSDK } from './hooks'

export const Login = () => {
   const { loginWithCredentials, control, errors } = useLogin()

   const { loginWithFb } = useFbSDK()

   return (
      <>
         <Input
            {...{ control }}
            id="email"
            label={t('guest.login.inputs.email.label')}
            type="text"
            placeholder={t('guest.login.inputs.email.placeholder')}
            error={errors.email?.message}
         />
         <Input
            {...{ control }}
            id="password"
            label={t('guest.login.inputs.password.label')}
            type="password"
            placeholder={t('guest.login.inputs.password.placeholder')}
            error={errors.password?.message}
            secureTextEntry
         />
         <Submit onPress={loginWithCredentials}>
            <Text>{t('guest.login.buttons.login')}</Text>
         </Submit>
         <Submit onPress={loginWithFb} withFacebook>
            <Text>{t('guest.login.buttons.fbLogin')}</Text>
         </Submit>
         <Annotations>
            <AnnotationContainer>
               <Annotation onPress={() => navigate('PasswordSupport')} noMargin>
                  {t('guest.login.annotation2')}
               </Annotation>
            </AnnotationContainer>
         </Annotations>
      </>
   )
}

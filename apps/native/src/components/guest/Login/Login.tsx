import { navigate, t } from '@online-library/core'

import { useLogin } from '@online-library/logic'

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
         <Submit onPress={loginWithCredentials}>
            <Text>{t('buttons.login')}</Text>
         </Submit>
         <Submit onPress={loginWithFb} withFacebook>
            <Text>{t('buttons.fbLogin')}</Text>
         </Submit>
         <Annotations>
            <AnnotationContainer>
               <Annotation onPress={() => navigate('PasswordSupport')} noMargin>
                  {t('login.annotation2')}
               </Annotation>
            </AnnotationContainer>
         </Annotations>
      </>
   )
}

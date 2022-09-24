import { navigate } from '@online-library/core'

import { t, useLogin } from '@online-library/ui'

import { Annotation, AnnotationContainer, Annotations } from 'components/guest/Registration/styled'
import { ButtonText, Submit } from 'components/shared/styled'

import { Input } from 'components/shared'

export const Login = () => {
   const { loginWithCredentials, control, errors } = useLogin()
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
            <ButtonText>Login</ButtonText>
         </Submit>
         <Annotations>
            <AnnotationContainer>
               <Annotation onClick={() => navigate('EmailSupport')}>
                  {t('guest.login.annotation1')}
               </Annotation>
            </AnnotationContainer>
            <AnnotationContainer>
               <Annotation onClick={() => navigate('Login')} noMargin>
                  {t('guest.login.annotation2')}
               </Annotation>
            </AnnotationContainer>
         </Annotations>
      </>
   )
}

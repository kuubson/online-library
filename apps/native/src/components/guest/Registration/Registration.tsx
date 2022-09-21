import { useNavigation } from '@react-navigation/native'

import { t } from '@online-library/locales'

import * as Styled from './styled'
import { Submit } from 'components/shared/styled'

import { Input } from 'components/shared'

export const Registration = () => {
   const { register, control, errors } = {} as any

   const navigation = useNavigation()

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
         />
         <Input
            {...{ control }}
            id="repeatedPassword"
            label={t('guest.registration.inputs.repeatedPassword.label')}
            type="password"
            placeholder={t('guest.registration.inputs.repeatedPassword.placeholder')}
            error={errors.repeatedPassword?.message}
         />
         <Submit onPress={register}>Register</Submit>
         <Styled.Annotations>
            <Styled.AnnotationContainer>
               <Styled.Annotation onClick={() => navigation.navigate('EmailSupport')}>
                  {t('guest.registration.annotation1')}
               </Styled.Annotation>
            </Styled.AnnotationContainer>
            <Styled.AnnotationContainer>
               <Styled.Annotation onClick={() => navigation.navigate('Login')}>
                  {t('guest.registration.annotation2')}
               </Styled.Annotation>
            </Styled.AnnotationContainer>
         </Styled.Annotations>
      </>
   )
}
import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

export const useSupport = (withPasswordSupport: boolean | undefined) => {
   const post = withPasswordSupport
      ? API['/api/user/auth/password-recovery'].post
      : API['/api/user/auth/activation-token-resend'].post

   const { submit, control, errors, getValues } = useForm(post.validation)

   const handleSupport = async () => {
      await apiAxios(post, getValues()).then(() =>
         setApiFeedback(post.header, post.errors[200], 'Okey', () => history.push('/login'))
      )
   }

   return {
      handleSupport: submit(handleSupport),
      control,
      errors,
   }
}

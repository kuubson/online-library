import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

import type { FBLoginRequest, FBMeRespose } from 'types'

const { request, validation } = API['/api/user/auth/login'].post

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm(validation)

   const login = async () => {
      const response = await apiAxios<typeof validation>(request, getValues())
      if (response) {
         history.push('/store')
      }
   }

   const loginWithFacebook = async () => {
      const handleFBlogin = ({ authResponse, status }: FBLoginRequest) => {
         const { request, validation, header, errors } = API['/api/user/auth/login/fb'].post

         if (authResponse && status === 'connected') {
            return window.FB.api(
               '/me?fields=id,first_name,email',
               async ({ first_name, email }: FBMeRespose) => {
                  const response = await apiAxios<typeof validation>(request, {
                     name: first_name,
                     email,
                     access_token: authResponse.accessToken,
                  })

                  if (response) {
                     history.push('/store')
                  }
               }
            )
         }

         setApiFeedback(header, errors[400])
      }

      window.FB.login(handleFBlogin, { scope: 'email,public_profile' })
   }

   return {
      login: submit(login),
      loginWithFacebook,
      control,
      errors,
   }
}

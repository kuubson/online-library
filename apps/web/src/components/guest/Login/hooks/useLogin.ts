import { setApiFeedback, useForm } from '@online-library/core'

import { API } from '@online-library/tools'

import { apiAxios, history } from 'utils'

import type { FBLoginRequest, FBMeRespose } from 'types'

const { request, validation } = API['/api/user/auth/login/credentials'].post

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm(validation)

   const loginWithCredentials = async () => {
      const response = await apiAxios<typeof validation>(request, getValues())
      if (response) {
         history.push('/store')
      }
   }

   const loginWithFb = () => {
      const { request, validation, header, errors } = API['/api/user/auth/login/fb'].post
      window.FB.login(
         ({ authResponse, status }: FBLoginRequest) => {
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
         },
         { scope: 'email,public_profile' }
      )
   }

   return {
      loginWithCredentials: submit(loginWithCredentials),
      loginWithFb,
      control,
      errors,
   }
}

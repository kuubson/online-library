import { API, FB_FIELDS } from '@online-library/config'

import type { FBLoginRequest, FBMeRespose } from '@online-library/core'
import {
   apiAxios,
   callback,
   history,
   navigate,
   setApiFeedback,
   useForm,
} from '@online-library/core'

const { request, validation } = API['/api/user/auth/login/credentials'].post

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm(validation)

   const loginWithCredentials = async () => {
      const response = await apiAxios<typeof validation>(request, getValues())
      if (response) {
         callback({
            web: () => history.push('/store'),
            native: () => navigate('Store'),
         })
      }
   }

   const loginWithFb = () => {
      const { request, validation, header, errors } = API['/api/user/auth/login/fb'].post
      window.FB.login(
         ({ authResponse, status }: FBLoginRequest) => {
            if (authResponse && status === 'connected') {
               return window.FB.api(
                  `/me?fields=${FB_FIELDS}`,
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
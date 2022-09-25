import { API, FB_FIELDS, isWeb } from '@online-library/config'

import {
   FBLoginRequest,
   FBMeRespose,
   apiAxios,
   history,
   setApiFeedback,
   setRole,
   useForm,
} from '@online-library/core'

const { request, validation } = API['/api/user/auth/login/credentials'].post

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm(validation)

   const loginWithCredentials = async () => {
      const response = await apiAxios<typeof validation>(request, getValues())
      if (response) {
         setRole('user')
         if (isWeb) {
            history.push('/store')
         }
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

import { API } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

import type { FBLoginRequest, FBMeRespose } from 'types'

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm(
      API.login.validation || API.loginWithFacebook.validation
   )

   const login = async () => {
      await axios.post(API.login.url, getValues()).then(() => history.push('/store'))
   }

   const loginWithFacebook = async () => {
      window.FB.login(
         ({ authResponse, status }: FBLoginRequest) => {
            if (authResponse && status === 'connected') {
               window.FB.api(
                  '/me?fields=id,first_name,email',
                  async ({ first_name, email }: FBMeRespose) => {
                     await axios
                        .post(API.loginWithFacebook.url, {
                           name: first_name,
                           email,
                           access_token: authResponse.accessToken,
                        })
                        .then(() => history.push('/store'))
                  }
               )
            } else {
               setApiFeedback(API.loginWithFacebook.header, API.loginWithFacebook.post[400], 'Okey')
            }
         },
         { scope: 'email,public_profile' }
      )
   }

   return {
      login: submit(login),
      loginWithFacebook,
      control,
      errors,
   }
}

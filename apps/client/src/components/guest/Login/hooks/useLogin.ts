import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

import type { FBLoginRequest, FBMeRespose } from 'types'

const { post } = API['/api/user/auth/login']

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm(post.validation)

   const login = async () => apiAxios(post, getValues()).then(() => history.push('/store')) // TODO: verify if can skip await

   const loginWithFacebook = async () => {
      const { post } = API['/api/user/auth/login/fb']
      window.FB.login(
         ({ authResponse, status }: FBLoginRequest) => {
            if (authResponse && status === 'connected') {
               window.FB.api(
                  '/me?fields=id,first_name,email',
                  async ({ first_name, email }: FBMeRespose) => {
                     await apiAxios(post, {
                        name: first_name,
                        email,
                        access_token: authResponse.accessToken,
                     }).then(() => history.push('/store'))
                  }
               )
            } else {
               setApiFeedback(post.header, post.errors[400])
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

import type React from 'react'

import { API } from 'config'

import { email, uncheckedPassword, yup } from 'shared'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const schema = yup.object({
   email,
   password: uncheckedPassword,
})

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm({ schema })

   const login = async () => {
      await axios.post(API.auth.login, getValues())
      history.push('/store')
   }

   const loginWithFacebook = async (event: React.MouseEvent) => {
      event.preventDefault()
      window.FB.login(
         ({ authResponse, status }: FBLoginRequest) => {
            if (authResponse && status === 'connected') {
               return window.FB.api(
                  '/me?fields=id,first_name,email',
                  async ({ first_name, email }: FBMeRespose) => {
                     const response = await axios.post(API.auth.loginWithFacebook, {
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
            setApiFeedback(
               'Logging to the app',
               'There was an unexpected problem when logging in with Facebook',
               'Okey'
            )
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

import type React from 'react'

import { API } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const useLogin = () => {
   const { submit, control, errors, getValues } = useForm({ schema: API.AUTH.login.schema })

   const login = async () => {
      await axios.post(API.AUTH.login.url, getValues()).then(() => {
         history.push('/store')
      })
   }

   const loginWithFacebook = async (event: React.MouseEvent) => {
      event.preventDefault()

      const handleFBlogin = ({ authResponse, status }: FBLoginRequest) => {
         if (authResponse && status === 'connected') {
            window.FB.api(
               '/me?fields=id,first_name,email',
               async ({ first_name, email }: FBMeRespose) => {
                  await axios
                     .post(API.AUTH.loginWithFacebook.url, {
                        name: first_name,
                        email,
                        access_token: authResponse.accessToken,
                     })
                     .then(() => {
                        history.push('/store')
                     })
               }
            )
         } else {
            setApiFeedback(
               API.AUTH.loginWithFacebook.header,
               API.AUTH.loginWithFacebook.post.responses['400'].description,
               'Okey'
            )
         }
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

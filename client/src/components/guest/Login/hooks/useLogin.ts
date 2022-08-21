import type React from 'react'
import { useState } from 'react'

import { useFormHandler } from 'hooks'

import { handleApiValidation, setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const useLogin = () => {
   const [form, setForm] = useState({
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
   })

   const { email, password } = form

   const formHandler = useFormHandler(setForm)

   const validate = () => {
      let validated = true

      setForm(form => ({
         ...form,
         emailError: '',
         passwordError: '',
      }))

      if (!formHandler.validateEmail(email)) validated = false
      if (!formHandler.validatePassword(password, '', true)) validated = false

      return validated
   }

   const login = async (event: React.FormEvent) => {
      event.preventDefault()
      if (validate()) {
         try {
            const url = '/api/user/auth/login'

            const response = await axios.post(url, {
               email,
               password,
            })

            if (response) {
               history.push('/store')
            }
         } catch (error) {
            handleApiValidation(error as ApiError, setForm)
         }
      }
   }

   const loginWithFacebook = async (event: React.MouseEvent) => {
      event.preventDefault()

      const url = '/api/user/auth/loginWithFacebook'

      window.FB.login(
         ({ authResponse, status }: FBLoginRequest) => {
            if (authResponse && status === 'connected') {
               return window.FB.api(
                  '/me?fields=id,first_name,email',
                  async ({ first_name, email }: FBMeRespose) => {
                     const response = await axios.post(url, {
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
               'Logging to app',
               'There was an unexpected problem when logging in with Facebook',
               'Okey'
            )
         },
         { scope: 'email,public_profile' }
      )
   }

   return {
      form,
      formHandler,
      login,
      loginWithFacebook,
   }
}

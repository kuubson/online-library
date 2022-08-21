import { API } from 'config'

import { email, password, repeatedPassword, string, yup } from 'shared'

import { useForm } from 'hooks'

import { handleApiValidation, setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const schema = yup.object({
   name: string,
   email,
   password,
   repeatedPassword: repeatedPassword(),
})

export const useRegistration = () => {
   const { submit, control, errors, getValues, setError } = useForm({ schema })

   const register = async () => {
      try {
         await axios.post(API.register, getValues())
         setApiFeedback(
            'Account registration',
            'An e-mail with an activation link has been sent to the email address provided. Open it and activate your account',
            'Okey',
            () => history.push('/login')
         )
      } catch (error) {
         handleApiValidation(error as ApiError, setError)
      }
   }

   return {
      register: submit(register),
      control,
      errors,
   }
}

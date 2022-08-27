import { AuthAPI } from 'config'

import { email, password, repeatedPassword, string, yup } from 'shared'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const schema = yup.object({
   name: string,
   email,
   password,
   repeatedPassword: repeatedPassword(),
})

export const useRegistration = () => {
   const { submit, control, errors, getValues } = useForm({ schema })

   const register = async () => {
      await axios.post(AuthAPI.register, getValues())
      setApiFeedback(
         'Account registration',
         'An e-mail with an activation link has been sent to the email address provided. Open it and activate your account',
         'Okey',
         () => history.push('/login')
      )
   }

   return {
      register: submit(register),
      control,
      errors,
   }
}

import { API, email, password, repeatedPassword, string, yup } from 'shared'

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
      await axios.post(API.AUTH.register.url, getValues()).then(() => {
         setApiFeedback(
            API.AUTH.register.header,
            API.AUTH.register.post.responses[200].description,
            'Okey',
            () => history.push('/login')
         )
      })
   }

   return {
      register: submit(register),
      control,
      errors,
   }
}

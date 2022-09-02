import { API } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const useRegistration = () => {
   const { submit, control, errors, getValues } = useForm({ schema: API.AUTH.register.schema })

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

import { API } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const { header, url, post, validation } = API.register

export const useRegistration = () => {
   const { submit, control, errors, getValues } = useForm(validation)

   const register = async () => {
      await axios
         .post(url, getValues())
         .then(() => setApiFeedback(header, post[200], 'Okey', () => history.push('/login')))
   }

   return {
      register: submit(register),
      control,
      errors,
   }
}

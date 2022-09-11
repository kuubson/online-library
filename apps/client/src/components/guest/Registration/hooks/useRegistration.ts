import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

const { post } = API['/api/user/auth/register']

export const useRegistration = () => {
   const { submit, control, errors, getValues } = useForm(post.validation)

   const register = async () => {
      await apiAxios(post, getValues()).then(() =>
         // TODO: check useLogin.ts
         setApiFeedback(post.header, post.errors[200], 'Okey', () => history.push('/login'))
      )
   }

   return {
      register: submit(register),
      control,
      errors,
   }
}

import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

const { request, validation, header, errors } = API['/api/user/auth/register'].post

export const useRegistration = () => {
   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const register = async () => {
      const response = await apiAxios(request, getValues())
      if (response) {
         setApiFeedback(header, errors[200], 'Okey', () => history.push('/login'))
      }
   }

   return {
      register: submit(register),
      control,
      errors: formErrors,
   }
}

import { API, callback } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history, navigate } from 'utils'

const { request, validation, header, errors } = API['/api/user/auth/register'].post

export const useRegistration = () => {
   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const register = async () => {
      const response = await apiAxios<typeof validation>(request, getValues())
      if (response) {
         setApiFeedback(header, errors[200], 'Okey', () =>
            callback({
               web: () => history.push('/login'),
               native: () => navigate('Login'),
            })
         )
      }
   }

   return {
      register: submit(register),
      control,
      errors: formErrors,
   }
}

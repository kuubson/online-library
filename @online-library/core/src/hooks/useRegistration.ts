import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import type { AxiosOverload, Callback, FormEvent } from 'types'

import { API } from '../utils/API'

const { request, validation, header, errors } = API['/api/user/auth/register'].post

export const useRegistration = (axios: AxiosOverload) => {
   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const register = (callback: Callback, event?: FormEvent) =>
      submit(async () => {
         const response = await axios<typeof validation>(request, getValues())
         if (response) {
            setApiFeedback(header, errors[200], 'Okey', callback)
         }
      })(event)

   return {
      register,
      control,
      errors: formErrors,
   }
}

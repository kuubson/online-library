import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import type { AxiosOverload } from 'types'

const { request, validation, header, errors } = API['/api/user/auth/register'].post

export const useRegistration = (axios: AxiosOverload) => {
   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const register = async (callback: () => void) => {
      const response = await axios<typeof validation>(request, getValues())
      if (response) {
         setApiFeedback(header, errors[200], 'Okey', callback)
      }
   }

   return {
      register: (...args: Parameters<typeof register>) => submit(() => register(...args)),
      control,
      errors: formErrors,
   }
}

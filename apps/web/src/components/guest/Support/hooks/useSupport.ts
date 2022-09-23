import { API } from '@online-library/config'

import { apiAxios, history, setApiFeedback, useForm } from '@online-library/core'

export const useSupport = (withPasswordSupport: boolean | undefined) => {
   const { request, validation, header, errors } = withPasswordSupport
      ? API['/api/user/auth/password'].post
      : API['/api/user/auth/activation-token'].post

   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const handleSupport = async () => {
      const response = await apiAxios<typeof validation>(request, getValues())
      if (response) {
         setApiFeedback(header, errors[200], 'Okey', () => history.push('/login'))
      }
   }

   return {
      handleSupport: submit(handleSupport),
      control,
      errors: formErrors,
   }
}

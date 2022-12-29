import { API } from '@online-library/config'

import { apiAxios, setApiFeedback, useForm } from '@online-library/core'

import { useQueryParams } from 'hooks'

const { request, validation, header, responses } = API['/api/user/auth/password'].patch

export const usePasswordReset = () => {
   const { passwordToken } = useQueryParams()

   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const changePassword = async () => {
      const response = await apiAxios<typeof validation>(request, {
         ...getValues(),
         passwordToken: passwordToken as string,
      })
      if (response) {
         setApiFeedback(header, responses[200], 'Okey', () => window.navigate('/login'))
      }
   }

   return {
      changePassword: submit(changePassword),
      control,
      errors: formErrors,
   }
}

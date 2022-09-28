import { useParams } from 'react-router-dom'

import { API } from '@online-library/config'

import { apiAxios, history, setApiFeedback, useForm } from '@online-library/core'

const { request, validation, header, responses } = API['/api/user/auth/password'].patch

export const usePasswordReset = () => {
   const { passwordToken } = useParams()

   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const changePassword = async () => {
      const response = await apiAxios<typeof validation>(request, {
         ...getValues(),
         passwordToken,
      })
      if (response) {
         setApiFeedback(header, responses[200], 'Okey', () => history.push('/login'))
      }
   }

   return {
      changePassword: submit(changePassword),
      control,
      errors: formErrors,
   }
}

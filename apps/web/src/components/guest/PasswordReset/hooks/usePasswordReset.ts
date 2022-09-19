import { useParams } from 'react-router-dom'

import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

const { request, validation, header, errors } = API['/api/user/auth/password'].patch

export const usePasswordReset = () => {
   const { passwordToken } = useParams()

   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   const changePassword = async () => {
      const response = await apiAxios<typeof validation>(request, {
         ...getValues(),
         passwordToken,
      })
      if (response) {
         setApiFeedback(header, errors[200], 'Okey', () => history.push('/login'))
      }
   }

   return {
      changePassword: submit(changePassword),
      control,
      errors: formErrors,
   }
}
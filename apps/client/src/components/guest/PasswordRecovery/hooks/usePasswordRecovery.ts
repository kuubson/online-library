import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

const { request, validation, header, errors } = API['/api/user/auth/password-change'].put

export const usePasswordRecovery = () => {
   const { passwordToken } = useParams()

   const { submit, control, errors: formErrors, getValues } = useForm(validation)

   useEffect(() => {
      const checkPasswordToken = () => {
         try {
            const { request } = API['/api/user/auth/password-token-check'].post
            apiAxios(request, { passwordToken })
         } catch (error) {
            history.push('/login')
         }
      }
      checkPasswordToken()
   }, [])

   const changePassword = async () => {
      const response = await apiAxios(request, {
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

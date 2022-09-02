import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { API } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const usePasswordRecovery = () => {
   const { passwordToken } = useParams()

   useEffect(() => {
      const checkPasswordToken = async () => {
         try {
            await axios.post(API.AUTH.checkPasswordToken.url, { passwordToken })
         } catch (error) {
            history.push('/login')
         }
      }
      checkPasswordToken()
   }, [])

   const { submit, control, errors, getValues } = useForm({
      schema: API.AUTH.changePassword.schema,
   })

   const changePassword = async () => {
      await axios
         .post(API.AUTH.changePassword.url, {
            ...getValues(),
            passwordToken,
         })
         .then(() => {
            setApiFeedback(
               'Password Recovery',
               'Your password has been successfully changed, you can login now',
               'Okey',
               () => history.push('/login')
            )
         })
   }

   return {
      changePassword: submit(changePassword),
      control,
      errors,
   }
}

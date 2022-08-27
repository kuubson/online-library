import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { API } from 'config'

import { password, repeatedPassword, yup } from 'shared'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const schema = yup.object({
   password,
   repeatedPassword: repeatedPassword('password'),
})

export const usePasswordRecovery = () => {
   const { passwordToken } = useParams()

   useEffect(() => {
      const checkPasswordToken = async () => {
         try {
            await axios.post(API.auth.checkPasswordToken, { passwordToken })
         } catch (error) {
            history.push('/login')
         }
      }
      checkPasswordToken()
   }, [])

   const { submit, control, errors, getValues } = useForm({ schema })

   const changePassword = async () => {
      await axios.post(API.auth.changePassword, {
         ...getValues(),
         passwordToken,
      })
      setApiFeedback(
         'Password Recovery',
         'Your password has been successfully changed, you can login now',
         'Okey',
         () => history.push('/login')
      )
   }

   return {
      changePassword: submit(changePassword),
      control,
      errors,
   }
}

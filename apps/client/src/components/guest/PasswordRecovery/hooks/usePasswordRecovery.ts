import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { API } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const { header, url, post, validation } = API.changePassword

export const usePasswordRecovery = () => {
   const { passwordToken } = useParams()

   const { submit, control, errors, getValues } = useForm(validation)

   useEffect(() => {
      const checkPasswordToken = async () => {
         try {
            await axios.post(API.checkPasswordToken.url, { passwordToken })
         } catch (error) {
            history.push('/login')
         }
      }
      checkPasswordToken()
   }, [])

   const changePassword = async () => {
      await axios
         .post(url, {
            ...getValues(),
            passwordToken,
         })
         .then(() => setApiFeedback(header, post[200], 'Okey', () => history.push('/login')))
   }

   return {
      changePassword: submit(changePassword),
      control,
      errors,
   }
}

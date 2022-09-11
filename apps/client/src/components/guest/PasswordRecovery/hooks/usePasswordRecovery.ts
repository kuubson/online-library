import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { API } from '@online-library/tools'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

const { put } = API['/api/user/auth/password-change']

export const usePasswordRecovery = () => {
   const { passwordToken } = useParams()

   const { submit, control, errors, getValues } = useForm(put.validation)

   useEffect(() => {
      ;async () =>
         apiAxios(API['/api/user/auth/password-token-check'].post, { passwordToken }).catch(() =>
            history.push('/login')
         )
   }, [])

   const changePassword = async () =>
      apiAxios(put, {
         ...getValues(),
         passwordToken,
      }).then(() =>
         setApiFeedback(put.header, put.errors[200], 'Okey', () => history.push('/login'))
      )

   return {
      changePassword: submit(changePassword),
      control,
      errors,
   }
}

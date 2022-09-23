import { useEffect } from 'react'
import type { InferType } from 'yup'

import { API } from '@online-library/config'

import { apiAxios, history, setApiFeedback } from '@online-library/core'

import { useQueryParams } from 'hooks'

const { request, validation, header, errors } = API['/api/user/auth/account'].patch

export const useAccountActivation = () => {
   const { activationToken } = useQueryParams() as InferType<typeof validation>

   const activateAccount = async () => {
      try {
         const response = await apiAxios<typeof validation>(request, { activationToken })

         if (response) {
            setApiFeedback(header, errors[200], 'Okey', () => history.push('/login'))
         }
      } catch (error) {
         history.push('/login')
      }
   }

   useEffect(() => {
      if (activationToken) {
         activateAccount()
      }
   }, [activationToken])
}

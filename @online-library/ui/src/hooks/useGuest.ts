import { useEffect } from 'react'

import { API } from '@online-library/config'

import type { TokenCheckResponse } from '@online-library/core'
import { defaultAxios, handleApiError, history, useSocket } from '@online-library/core'

export const useGuest = () => {
   const { closeSocketConnection } = useSocket()

   const checkAuth = async () => {
      try {
         const { request } = API['/api/auth-check'].get

         const response = await defaultAxios<TokenCheckResponse>(request)

         if (response) {
            const { role } = response.data

            if (role === 'user') {
               return history.push('/store')
            }

            closeSocketConnection()
         }
      } catch (error) {
         handleApiError(error)
      }
   }

   useEffect(() => {
      checkAuth()
   }, [])
}

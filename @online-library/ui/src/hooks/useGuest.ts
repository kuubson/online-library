import { useEffect } from 'react'

import { API, isWeb } from '@online-library/config'

import {
   TokenCheckResponse,
   defaultAxios,
   handleApiError,
   history,
   setRole,
   useSocket,
} from '@online-library/core'

export const useGuest = () => {
   const { closeSocketConnection } = useSocket()

   const checkAuth = async () => {
      try {
         const { request } = API['/api/auth-check'].get

         const response = await defaultAxios<TokenCheckResponse>(request)

         if (response) {
            const { role } = response.data

            setRole(role)

            if (role === 'guest') {
               closeSocketConnection()
            }

            if (role === 'user') {
               if (isWeb) {
                  history.push('/store')
               }
            }
         }
      } catch (error) {
         handleApiError(error)
      }
   }

   useEffect(() => {
      checkAuth()
   }, [])
}

import { API } from '@online-library/tools'

import { useSocket } from 'hooks'

import { handleApiError } from 'helpers'

import { defaultAxios, history } from 'utils'

import type { TokenCheckResponse } from 'types'

export const useGuest = () => {
   const { closeSocketConnection } = useSocket()

   const checkToken = async () => {
      try {
         const { request } = API['/api/user/global/token-check'].get

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

   return { checkToken }
}

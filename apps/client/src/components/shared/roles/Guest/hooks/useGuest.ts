import { API } from 'online-library'

import { useSocket } from 'hooks'

import { handleApiError } from 'helpers'

import { defaultAxios, history } from 'utils'

import type { CheckTokenResponse } from 'types'

export const useGuest = () => {
   const { closeSocketConnection } = useSocket()

   const checkToken = async () => {
      try {
         const response = await defaultAxios.get<CheckTokenResponse>(API.checkToken.url)

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

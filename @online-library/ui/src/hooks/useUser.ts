import { useEffect } from 'react'

import { API, isWeb } from '@online-library/config'

import {
   ChatDetailsResponse,
   TokenCheckResponse,
   defaultAxios,
   handleApiError,
   history,
   setRole,
   useChatDetails,
} from '@online-library/core'

export const useUser = () => {
   const { setCurrentUserId, setLastUnreadMessageIndex, setUnreadMessagesAmount } = useChatDetails()

   const checkAuth = async () => {
      try {
         const { request } = API['/api/auth-check'].get

         const response = await defaultAxios<TokenCheckResponse>(request)

         if (response) {
            const { role } = response.data

            setRole(role)

            if (role !== 'user') {
               if (isWeb) {
                  history.push('/login')
               }
            }
         }
      } catch (error) {
         handleApiError(error)
      }
   }

   const getChatDetails = async () => {
      const { request } = API['/api/user/chat/details'].get

      const response = await defaultAxios<ChatDetailsResponse>(request)

      if (response) {
         const { lastUnreadMessageIndex, unreadMessagesAmount, userId } = response.data

         setCurrentUserId(userId)

         setLastUnreadMessageIndex(lastUnreadMessageIndex)

         setUnreadMessagesAmount(unreadMessagesAmount)
      }
   }

   useEffect(() => {
      checkAuth()
      getChatDetails()
   }, [])
}

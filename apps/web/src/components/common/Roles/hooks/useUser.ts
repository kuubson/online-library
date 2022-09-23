import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import type { MessageType } from '@online-library/tools'
import { API } from '@online-library/tools'

import { defaultAxios, history, useCart, useChatDetails, useSocket } from '@online-library/core'

import { handleApiError } from 'helpers'

import type { ChatDetailsResponse, TokenCheckResponse } from 'types'

export const useUser = (withChat: boolean | undefined) => {
   const { socket, setSocket } = useSocket()

   const { cart } = useCart()

   const {
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   } = useChatDetails()

   const [currentUserId, setCurrentUserId] = useState<string | null>(null)

   useEffect(() => {
      if (!socket) {
         setSocket(io('/user'))
      }

      const checkAuth = async () => {
         try {
            const { request } = API['/api/auth-check'].get

            const response = await defaultAxios<TokenCheckResponse>(request)

            if (response) {
               const { role } = response.data
               if (role !== 'user') {
                  history.push('/login')
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

            setLastUnreadMessageIndex(lastUnreadMessageIndex)
            setUnreadMessagesAmount(unreadMessagesAmount)

            setCurrentUserId(userId)
         }
      }

      checkAuth()
      getChatDetails()
   }, [])

   const handleOnSendMessage = (message: MessageType) => {
      if (!withChat && message.userId !== currentUserId) {
         setUnreadMessagesAmount(unreadMessagesAmount + 1)
         setLastUnreadMessageIndex(lastUnreadMessageIndex ? lastUnreadMessageIndex + 1 : 1)
      }
   }

   useEffect(() => {
      socket?.on('sendMessage', handleOnSendMessage)
      return () => {
         socket?.off('sendMessage', handleOnSendMessage)
      }
   }, [socket, unreadMessagesAmount, currentUserId])

   const options = [
      {
         option: 'Store',
         pathname: '/store',
      },
      {
         option: 'Profile',
         pathname: '/profile',
      },
      {
         option: 'Cart',
         pathname: '/cart',
         counter: cart.length <= 99 ? cart.length : 99,
      },
      {
         option: 'Chat',
         pathname: '/chat',
         counter: unreadMessagesAmount && (unreadMessagesAmount <= 99 ? unreadMessagesAmount : 99),
      },
      { option: 'Logout' },
   ]

   return { options }
}

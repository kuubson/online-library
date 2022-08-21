import axios from 'axios'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { useCart, useMessagesInfo, useSocket } from 'hooks'

import { handleApiError } from 'helpers'

import { history } from 'utils'

type GetMessagesInfoResponse = {
   lastUnreadMessageIndex: number
   unreadMessagesAmount: number
   userId: string
}

export const useUser = (withChat: boolean | undefined) => {
   const { socket, setSocket } = useSocket()

   const { cart } = useCart()

   const {
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   } = useMessagesInfo()

   const [currentUserId, setCurrentUserId] = useState<string | null>(null)

   useEffect(() => {
      if (!socket) {
         setSocket(io('/user'))
      }

      const checkToken = async () => {
         try {
            const url = '/api/global/auth/checkToken'

            const response = await axios.get<CheckTokenResponse>(url)

            if (response) {
               const { role } = response.data
               if (role !== 'user') {
                  history.push('/login')
               }
            }
         } catch (error) {
            handleApiError(error as ApiError)
         }
      }

      const getMessagesInfo = async () => {
         const url = '/api/user/chat/getMessagesInfo'

         const response = await axios.get<GetMessagesInfoResponse>(url)

         if (response) {
            const { lastUnreadMessageIndex, unreadMessagesAmount, userId } = response.data

            setLastUnreadMessageIndex(lastUnreadMessageIndex)
            setUnreadMessagesAmount(unreadMessagesAmount)

            setCurrentUserId(userId)
         }
      }

      checkToken()

      getMessagesInfo()
   }, [])

   const handleOnSendMessage = (message: IMessage) => {
      if (!withChat && message.userId !== currentUserId) {
         setUnreadMessagesAmount(unreadMessagesAmount + 1)
         setLastUnreadMessageIndex(lastUnreadMessageIndex ? lastUnreadMessageIndex + 1 : 1)
      }
   }

   useEffect(() => {
      if (socket) {
         socket.on('sendMessage', handleOnSendMessage)
      }
      return () => {
         if (socket) {
            socket.off('sendMessage', handleOnSendMessage)
         }
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

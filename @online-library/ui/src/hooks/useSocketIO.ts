import { useEffect } from 'react'
import io from 'socket.io-client'

import type { MessageType } from '@online-library/config'

import { useChatDetails, useSocket } from '@online-library/core'

type UseSocketIOProps = {
   withChat: boolean
}

export const useSocketIO = ({ withChat }: UseSocketIOProps) => {
   const { socket, setSocket } = useSocket()

   const {
      currentUserId,
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   } = useChatDetails()

   useEffect(() => {
      if (!socket) {
         setSocket(io('/user'))
      }
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
}

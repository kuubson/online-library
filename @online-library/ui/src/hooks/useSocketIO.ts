import { useEffect } from 'react'
import io from 'socket.io-client'

import { MessageType, isWeb } from '@online-library/config'

import { useChatDetails, useSocket } from '@online-library/core'

type UseSocketIOProps = {
   SOCKETIO_URL?: string
   withChat: boolean
}

export const useSocketIO = ({ SOCKETIO_URL, withChat }: UseSocketIOProps) => {
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
         setSocket(io(isWeb ? '/user' : `${SOCKETIO_URL}/user`))
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

import { useEffect } from 'react'
import io from 'socket.io-client'

import { MessageType, isWeb } from '@online-library/config'

import { useChatDetails, useSocket } from '@online-library/core'

type UseSocketIOProps = {
   SERVER_NATIVE_URL?: string
   canUpdateChatDetails: boolean
}

export const useSocketIO = ({ SERVER_NATIVE_URL, canUpdateChatDetails }: UseSocketIOProps) => {
   const { socket, setSocket } = useSocket()

   const {
      currentUserId,
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   } = useChatDetails()

   useEffect(() => {
      if (isWeb) {
         setSocket(io('/user'))
      } else {
         setSocket(io(`${SERVER_NATIVE_URL}/user`, { withCredentials: true }))
      }
   }, [])

   useEffect(() => {
      const handleOnSendMessage = (message: MessageType) => {
         if (canUpdateChatDetails && message.userId !== currentUserId) {
            setUnreadMessagesAmount(unreadMessagesAmount + 1)
            setLastUnreadMessageIndex(lastUnreadMessageIndex ? lastUnreadMessageIndex + 1 : 1)
         }
      }

      socket?.on('sendMessage', handleOnSendMessage)

      return () => {
         socket?.off('sendMessage', handleOnSendMessage)
      }
   }, [socket, unreadMessagesAmount, currentUserId, canUpdateChatDetails])
}

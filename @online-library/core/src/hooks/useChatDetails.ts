import { chatDetailsActions } from '@redux/reducers/chatDetails'

import { useAction, useSelector } from 'hooks'

export const useChatDetails = () => {
   const { currentUserId, lastUnreadMessageIndex, unreadMessagesAmount } = useSelector(
      state => state.chatDetails
   )

   const setCurrentUserId = useAction(chatDetailsActions.setCurrentUserId)

   const setLastUnreadMessageIndex = useAction(chatDetailsActions.setLastUnreadMessageIndex)

   const setUnreadMessagesAmount = useAction(chatDetailsActions.setUnreadMessagesAmount)

   return {
      currentUserId,
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setCurrentUserId,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   }
}

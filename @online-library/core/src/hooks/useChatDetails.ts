import { chatDetailsActions } from '@redux/reducers/chatDetails'

import { useAction, useSelector } from 'hooks'

export const useChatDetails = () => {
   const { currentUserId, lastUnreadMessageIndex, unreadMessagesAmount, canUpdateChatDetails } =
      useSelector(state => state.chatDetails)

   const setCurrentUserId = useAction(chatDetailsActions.setCurrentUserId)

   const setLastUnreadMessageIndex = useAction(chatDetailsActions.setLastUnreadMessageIndex)

   const setUnreadMessagesAmount = useAction(chatDetailsActions.setUnreadMessagesAmount)

   const setCanUpdateChatDetails = useAction(chatDetailsActions.setCanUpdateChatDetails)

   return {
      currentUserId,
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      canUpdateChatDetails,
      setCurrentUserId,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
      setCanUpdateChatDetails,
   }
}

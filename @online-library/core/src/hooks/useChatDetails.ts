import { chatDetailsActions } from '@redux/reducers/chatDetails'

import { useAction, useSelector } from 'hooks'

export const useChatDetails = () => {
   const { lastUnreadMessageIndex, unreadMessagesAmount } = useSelector(state => state.chatDetails)

   const setLastUnreadMessageIndex = useAction(chatDetailsActions.setLastUnreadMessageIndex)

   const setUnreadMessagesAmount = useAction(chatDetailsActions.setUnreadMessagesAmount)

   return {
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   }
}

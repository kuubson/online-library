import { chatDetailsActions } from 'redux/reducers/chatDetails'

import { useSelector } from 'hooks'

import { useAction } from './useAction'

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

import { messagesInfoActions } from 'redux/reducers/messagesInfo'

import { useSelector } from 'hooks'

import { useAction } from './useAction'

export const useMessagesInfo = () => {
   const { lastUnreadMessageIndex, unreadMessagesAmount } = useSelector(state => state.messagesInfo)

   const setLastUnreadMessageIndex = useAction(messagesInfoActions.setLastUnreadMessageIndex)

   const setUnreadMessagesAmount = useAction(messagesInfoActions.setUnreadMessagesAmount)

   return {
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   }
}

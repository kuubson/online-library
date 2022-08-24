import { _setLastUnreadMessageIndex, _setUnreadMessagesAmount } from 'redux/reducers/messagesInfo'

import { useSelector } from 'hooks'

import { useAction } from './useAction'

export const useMessagesInfo = () => {
   const { lastUnreadMessageIndex, unreadMessagesAmount } = useSelector(state => state.messagesInfo)

   const setLastUnreadMessageIndex = useAction(_setLastUnreadMessageIndex)

   const setUnreadMessagesAmount = useAction(_setUnreadMessagesAmount)

   return {
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   }
}

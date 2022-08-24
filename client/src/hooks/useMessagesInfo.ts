import { _setLastUnreadMessageIndex, _setUnreadMessagesAmount } from 'redux/reducers/messagesInfo'

import { useDispatch, useSelector } from 'hooks'

export const useMessagesInfo = () => {
   const dispatch = useDispatch()

   const { lastUnreadMessageIndex, unreadMessagesAmount } = useSelector(state => state.messagesInfo)

   const setLastUnreadMessageIndex = (payload: number) =>
      dispatch(_setLastUnreadMessageIndex(payload))

   const setUnreadMessagesAmount = (payload: number) => dispatch(_setUnreadMessagesAmount(payload))

   return {
      lastUnreadMessageIndex,
      unreadMessagesAmount,
      setLastUnreadMessageIndex,
      setUnreadMessagesAmount,
   }
}

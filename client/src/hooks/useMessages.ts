import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

import actions from 'redux/actions'

export const useMessages = () => {
    const dispatch = useDispatch()
    const { lastUnreadMessageIndex, unreadMessagesAmount } = useSelector(
        (state: RootState) => state.messages
    )
    const setLastUnreadMessageIndex = (payload: number) =>
        dispatch({ type: actions.setLastUnreadMessageIndex, payload })
    const setUnreadMessagesAmount = (payload: number) =>
        dispatch({ type: actions.setUnreadMessagesAmount, payload })
    return {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    }
}

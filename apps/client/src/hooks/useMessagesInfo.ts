import { useAppDispatch, useAppSelector } from 'redux/hooks'

import {
    setLastUnreadMessageIndex as setLastUnreadMessageIndexAction,
    setUnreadMessagesAmount as setUnreadMessagesAmountAction
} from 'redux/reducers/messagesInfo'

export const useMessagesInfo = () => {
    const dispatch = useAppDispatch()
    const { lastUnreadMessageIndex, unreadMessagesAmount } = useAppSelector(
        state => state.messagesInfo
    )
    const setLastUnreadMessageIndex = (payload: number) =>
        dispatch(setLastUnreadMessageIndexAction(payload))
    const setUnreadMessagesAmount = (payload: number) =>
        dispatch(setUnreadMessagesAmountAction(payload))
    return {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    }
}

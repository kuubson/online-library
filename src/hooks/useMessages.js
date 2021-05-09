import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const dispatch = useDispatch()
    const { unreadMessagesAmount } = useSelector(state => state.messages)
    const setUnreadMessagesAmount = payload =>
        dispatch({ type: 'setUnreadMessagesAmount', payload })
    return {
        unreadMessagesAmount,
        setUnreadMessagesAmount
    }
}

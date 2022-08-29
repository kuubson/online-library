const initialState = {
    lastUnreadMessageIndex: undefined,
    unreadMessagesAmount: 0
}

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setLastUnreadMessageIndex':
            return {
                ...state,
                lastUnreadMessageIndex: payload
            }
        case 'setUnreadMessagesAmount':
            return {
                ...state,
                unreadMessagesAmount: payload
            }
        default:
            return state
    }
}

const initialState = {
    unreadMessagesAmount: 0
}

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setUnreadMessagesAmount':
            return {
                ...state,
                unreadMessagesAmount: payload
            }
        default:
            return state
    }
}

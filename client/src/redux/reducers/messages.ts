import actions from 'redux/actions'

type State = {
    lastUnreadMessageIndex: number | undefined
    unreadMessagesAmount: number
}

const initialState: State = {
    lastUnreadMessageIndex: undefined,
    unreadMessagesAmount: 0
}

type Action = {
    payload: number
    type: 'setLastUnreadMessageIndex' | 'setUnreadMessagesAmount'
}

const messages = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.setLastUnreadMessageIndex:
            return {
                ...state,
                lastUnreadMessageIndex: payload
            }
        case actions.setUnreadMessagesAmount:
            return {
                ...state,
                unreadMessagesAmount: payload
            }
        default:
            return state
    }
}

export default messages

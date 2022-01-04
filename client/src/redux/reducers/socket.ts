import { Socket } from 'socket.io-client'

import actions from 'redux/actions'

type State = {
    socket: Socket | undefined
}

const initialState: State = {
    socket: undefined
}

type Action = {
    payload: Socket
    type: 'setSocket'
}

const socket = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.setSocket:
            return {
                ...state,
                socket: payload
            }
        default:
            return state
    }
}

export default socket

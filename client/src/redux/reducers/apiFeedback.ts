/* eslint-disable @typescript-eslint/no-empty-function */
import actions from 'redux/actions'

const initialState = {
    data: {
        header: '',
        message: '',
        buttonText: '',
        callback: () => {}
    }
}

type Action = {
    payload: {
        header: string
        message: string
        buttonText: string
        callback: () => void
    }
    type: 'setApiFeedback'
}

const apiFeedback = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.setApiFeedback:
            return {
                ...state,
                data: payload
            }
        default:
            return state
    }
}

export default apiFeedback

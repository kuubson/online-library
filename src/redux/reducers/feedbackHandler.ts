interface IAction {
    payload: {
        header: string
        message: string
        buttonText: string
        callback: () => void
    }
    type: 'setFeedbackData'
}

const initialState = {
    data: {
        header: '',
        message: '',
        buttonText: '',
        callback: () => {}
    }
}

export default (state = initialState, { payload, type }: IAction) => {
    switch (type) {
        case 'setFeedbackData':
            return {
                ...state,
                data: payload
            }
        default:
            return state
    }
}

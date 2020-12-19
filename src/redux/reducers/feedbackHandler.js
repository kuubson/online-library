const initialState = {
    data: {
        header: '',
        message: '',
        buttonText: '',
        callback: () => {}
    }
}

export default (state = initialState, { payload, type }) => {
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

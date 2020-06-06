interface IAction {
    payload: boolean
    type: 'setIsLoading'
}

const initialState = {
    isLoading: false
}

export default (state = initialState, { payload, type }: IAction) => {
    switch (type) {
        case 'setIsLoading':
            return {
                ...state,
                isLoading: payload
            }
        default:
            return state
    }
}

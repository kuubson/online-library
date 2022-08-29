const initialState = {
    shouldPayPalModalAppear: false
}

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setShouldPayPalModalAppear':
            return {
                ...state,
                shouldPayPalModalAppear: payload
            }
        default:
            return state
    }
}

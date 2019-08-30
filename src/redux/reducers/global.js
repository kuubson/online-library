const initialState = {
    shouldBookUploaderAppear: false
}

export const global = (state = initialState, { payload, type }) => {
    switch (type) {
        case "setShouldBookUploaderAppear":
            return {
                ...state,
                shouldBookUploaderAppear: payload
            }
        default: return state
    }
}
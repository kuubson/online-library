const initialState = {
    shouldBookUploaderAppear: false,
    isLoading: false,
    userEmail: '',
    cart: []
}

export const global = (state = initialState, { payload, type }) => {
    switch (type) {
        case "setShouldBookUploaderAppear":
            return {
                ...state,
                shouldBookUploaderAppear: payload
            }
        case "setUserEmail":
            return {
                ...state,
                userEmail: payload
            }
        case "setIsLoading":
            return {
                ...state,
                isLoading: payload
            }
        case "setCart":
            return {
                ...state,
                cart: payload
            }
        default: return state
    }
}
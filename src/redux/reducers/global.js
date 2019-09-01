const initialState = {
    shouldBookUploaderAppear: false,
    shouldStoreModalAppear: false,
    storeModalData: {},
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
        case "setShouldStoreModalAppear":
            return {
                ...state,
                shouldStoreModalAppear: payload
            }
        case "setStoreModalData":
            return {
                ...state,
                storeModalData: payload
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
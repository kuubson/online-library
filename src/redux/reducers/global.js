const initialState = {
    shouldBookUploaderAppear: false,
    shouldStoreModalAppear: false,
    storeModalData: {}
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
        default: return state
    }
}
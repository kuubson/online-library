const initialState = {
    shouldStoreModalAppear: false,
    storeModalData: {},
}

export const storeModal = (state = initialState, { payload, type }) => {
    switch (type) {

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
        case "resetStoreModalData":
            return {
                ...state,
                storeModalData: {}
            }
        default: return state
    }
}
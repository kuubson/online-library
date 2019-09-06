const initialState = {
    apiResponseSuccessMessage: "",
    apiResponseErrorMessage: "",
    apiResponseWarningMessage: "",
    apiResponseCallbackFunction: undefined
}

export const api = (state = initialState, { payload, type }) => {
    switch (type) {
        case "setApiResponseSuccessMessage":
            return {
                ...state,
                apiResponseSuccessMessage: payload
            }
        case "setApiResponseErrorMessage":
            return {
                ...state,
                apiResponseErrorMessage: payload
            }
        case "setApiResponseWarningMessage":
            return {
                ...state,
                apiResponseWarningMessage: payload
            }
        case "setApiResponseCallbackFunction":
            return {
                ...state,
                apiResponseCallbackFunction: payload
            }
        case "resetApiResponses":
            return {
                ...state,
                apiResponseSuccessMessage: "",
                apiResponseErrorMessage: "",
                apiResponseWarningMessage: "",
                apiResponseCallbackFunction: undefined
            }
        default: return state
    }
}
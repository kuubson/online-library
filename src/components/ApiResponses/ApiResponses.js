import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ApiResponses = () => {
    const dispatch = useDispatch()
    const apiResponseSuccessMessage = useSelector(state => state.api.apiResponseSuccessMessage)
    const apiResponseErrorMessage = useSelector(state => state.api.apiResponseErrorMessage)
    const apiResponseWarningMessage = useSelector(state => state.api.apiResponseWarningMessage)
    const apiResponseCallbackFunction = useSelector(state => state.api.apiResponseCallbackFunction)
    const handleClick = () => {
        if (apiResponseSuccessMessage && apiResponseCallbackFunction) apiResponseCallbackFunction()
        dispatch({ type: 'resetApiResponses' })
    }
    return (
        <div className="apiResponses">
            {apiResponseSuccessMessage && <p className="apiResponses__successMessage">{apiResponseSuccessMessage}</p>}
            {apiResponseErrorMessage && <p className="apiResponses__errorMessage">{apiResponseErrorMessage}</p>}
            {apiResponseWarningMessage && <p className="apiResponses__warningMessage">{apiResponseWarningMessage}</p>}
            <button className="apiResponses__button" onClick={handleClick}>Okay</button>
        </div>
    )
}

export default ApiResponses
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

export default () => {
    const dispatch = useDispatch()
    const {
        data: { header, message, buttonText, callback }
    } = useSelector((state: RootState) => state.feedbackHandler)
    const shouldFeedbackHandlerAppear = !!header && !!message && !!buttonText
    const setFeedbackData = (
        header: string,
        message: string,
        buttonText = 'Okey',
        callback = () => {}
    ) =>
        dispatch({
            type: 'setFeedbackData',
            payload: {
                header,
                message,
                buttonText,
                callback
            }
        })
    return {
        header,
        message,
        buttonText,
        callback,
        shouldFeedbackHandlerAppear,
        setFeedbackData
    }
}

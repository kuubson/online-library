import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const dispatch = useDispatch()
    const {
        data: { header, message, buttonText, callback }
    } = useSelector(state => state.feedbackHandler)
    const shouldFeedbackHandlerAppear = !!header && !!message && !!buttonText
    const setFeedbackData = (header = '', message = '', buttonText = 'Okey', callback = () => {}) =>
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

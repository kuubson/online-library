import { useSelector } from 'react-redux'

export default () => {
    const {
        data: { header, message, buttonText, callback }
    } = useSelector(state => state.feedbackHandler)
    const shouldFeedbackHandlerAppear = !!header && !!message && !!buttonText
    return {
        header,
        message,
        buttonText,
        callback,
        shouldFeedbackHandlerAppear
    }
}

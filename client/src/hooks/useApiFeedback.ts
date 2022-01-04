import { useAppSelector } from 'redux/hooks'

export const useApiFeedback = () => {
    const { header, message, buttonText, callback } = useAppSelector(state => state.apiFeedback)
    const showApiFeedback = !!header && !!message && !!buttonText
    return {
        header,
        message,
        buttonText,
        callback,
        showApiFeedback
    }
}

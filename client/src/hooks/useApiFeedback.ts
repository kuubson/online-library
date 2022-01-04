import { useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

export const useApiFeedback = () => {
    const {
        data: { header, message, buttonText, callback }
    } = useSelector((state: RootState) => state.apiFeedback)
    const showApiFeedback = !!header && !!message && !!buttonText
    return {
        header,
        message,
        buttonText,
        callback,
        showApiFeedback
    }
}

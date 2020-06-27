import { store } from 'redux/store'

export default (header: string, message: string, buttonText = 'Okey', callback = () => {}) =>
    store.dispatch({
        type: 'setFeedbackData',
        payload: {
            header,
            message,
            buttonText,
            callback
        }
    })

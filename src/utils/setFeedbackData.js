import { store } from 'redux/store'

export default (header, message, buttonText = 'Okey', callback = () => {}) =>
    store.dispatch({
        type: 'setFeedbackData',
        payload: {
            header,
            message,
            buttonText,
            callback
        }
    })

/* eslint-disable @typescript-eslint/no-empty-function */
import { store } from 'redux/store'

import actions from 'redux/actions'

type ApiFeedbackSetter = (
    header: string,
    message: string,
    buttonText: string,
    callback?: () => void
) => void

export const setApiFeedback: ApiFeedbackSetter = (
    header,
    message,
    buttonText = 'Okey',
    callback = () => {}
) =>
    store.dispatch({
        type: actions.setApiFeedback,
        payload: {
            header,
            message,
            buttonText,
            callback
        }
    })

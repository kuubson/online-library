import { AxiosError } from 'axios'

import utils from 'utils'

export default (error: AxiosError) => {
    if (error.response) {
        const { errorHeader, errorMessage } = error.response.data
        const status = error.response.status
        if (status === 401) {
            return utils.setFeedbackData(errorHeader, errorMessage)
        }
        if (status !== 422) {
            if (errorHeader && errorMessage) {
                return utils.setFeedbackData(errorHeader, errorMessage)
            }
            return utils.setFeedbackData(
                'Connecting to the server',
                `A connection couldn't be established with the server or an unexpected problem occurred on its side`,
                'Refresh the application',
                () => window.location.reload()
            )
        }
    }
    if (error.request) {
        return utils.setFeedbackData(
            'Request Processing',
            'The server cannot temporarily process your request',
            'Refresh the application',
            () => window.location.reload()
        )
    }
    utils.setFeedbackData(
        'Request Processing',
        'An unexpected problem has occurred in your browser',
        'Refresh the application',
        () => window.location.reload()
    )
}

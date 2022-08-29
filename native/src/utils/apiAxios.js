import axios from 'axios'

import utils from 'utils'

const apiAxios = axios.create()

apiAxios.interceptors.request.use(
    request => {
        utils.setIsLoading(true)
        return request
    },
    error => {
        utils.setIsLoading(false)
        utils.handleApiError(error)
        throw error
    }
)

apiAxios.interceptors.response.use(
    response => {
        utils.setIsLoading(false)
        return response
    },
    error => {
        utils.setIsLoading(false)
        utils.handleApiError(error)
        throw error
    }
)

export default apiAxios

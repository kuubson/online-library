import axios from 'axios'

import utils from '~utils'

const apiAxios = axios.create({
    baseURL: process.env.API_ROOT
})

let timeoutId: number | undefined

apiAxios.interceptors.request.use(
    request => {
        !timeoutId && (timeoutId = setTimeout(() => utils.setIsLoading(true), 1000))
        return request
    },
    error => {
        utils.setIsLoading(false)
        clearTimeout(timeoutId)
        timeoutId = undefined
        utils.handleApiError(error)
        throw error
    }
)

apiAxios.interceptors.response.use(
    response => {
        utils.setIsLoading(false)
        clearTimeout(timeoutId)
        timeoutId = undefined
        return response
    },
    error => {
        utils.setIsLoading(false)
        clearTimeout(timeoutId)
        timeoutId = undefined
        utils.handleApiError(error)
        throw error
    }
)

export default apiAxios

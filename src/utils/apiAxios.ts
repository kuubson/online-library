import axios from 'axios'

import utils from 'utils'

const delayedApiAxios = axios.create({
    baseURL: process.env.API_ROOT
})

let timeoutId: number | undefined

delayedApiAxios.interceptors.request.use(
    request => {
        !timeoutId && (timeoutId = setTimeout(() => utils.setIsLoading(true), 1500))
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

delayedApiAxios.interceptors.response.use(
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

export default delayedApiAxios

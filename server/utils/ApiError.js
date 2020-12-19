export default class ApiError extends Error {
    constructor(errorHeader, errorMessage, status) {
        super()
        this.errorHeader = errorHeader
        this.errorMessage = errorMessage
        this.status = status
    }
}

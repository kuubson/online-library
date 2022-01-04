class ApiError extends Error {
    errorHeader: string
    errorMessage: string
    status: number
    constructor(errorHeader: string, errorMessage: string, status: number) {
        super()
        this.errorHeader = errorHeader
        this.errorMessage = errorMessage
        this.status = status
    }
}

export default ApiError

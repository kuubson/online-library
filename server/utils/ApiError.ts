export default class ApiError extends Error {
    constructor(public errorHeader: string, public errorMessage: string, public status: number) {
        super()
    }
}

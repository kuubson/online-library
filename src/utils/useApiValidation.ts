import { AxiosError } from 'axios'

interface IError {
    parameter: string
    error: string
}

export default (error: AxiosError, callback: (errors: object) => void) => {
    let errors = {}
    const response = error.response
    if (response && response.status === 422) {
        const results: IError[] = response.data.results
        results.map(
            ({ parameter, error }: IError) =>
                (errors = {
                    ...errors,
                    [`${parameter}Error`]: error
                })
        )
        callback(errors)
    }
}

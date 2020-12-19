export default (error, callback) => {
    let errors = {}
    const response = error.response
    if (response && response.status === 422) {
        const results = response.data.results
        results.map(
            ({ parameter, error }) =>
                (errors = {
                    ...errors,
                    [`${parameter}Error`]: error
                })
        )
        callback(errors)
    }
}

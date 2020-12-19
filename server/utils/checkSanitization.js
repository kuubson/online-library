import sanitize from 'sanitize-html'

export default value => {
    value = value.toString()
    if (value !== sanitize(value)) {
        throw new Error()
    }
    return sanitize(value)
}

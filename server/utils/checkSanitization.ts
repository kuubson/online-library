import sanitize from 'sanitize-html'

const checkSanitization = (value: string) => {
    value = value.toString()
    if (value !== sanitize(value)) {
        throw new Error()
    }
    return sanitize(value)
}

export default checkSanitization

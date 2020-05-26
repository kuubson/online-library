import sanitize from 'sanitize-html'

export default (value: string) => value !== sanitize(value)

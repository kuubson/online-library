import sanitize from 'sanitize-html'

export const checkSanitization = (value: string) => {
   if (value.toString() !== sanitize(value)) {
      throw new Error()
   }
   return sanitize(value)
}

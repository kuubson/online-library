import sanitize from 'sanitize-html'

export const checkSanitization = (value: string) => {
   value = value.toString()

   if (value !== sanitize(value)) {
      throw new Error()
   }

   return sanitize(value)
}

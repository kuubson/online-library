import sanitize from 'sanitize-html'

export const checkSanitization = (value: string) => {
   const _value = value.toString()

   if (_value !== sanitize(value)) {
      throw new Error()
   }

   return sanitize(value)
}

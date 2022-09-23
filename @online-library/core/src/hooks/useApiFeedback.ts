import { useSelector } from 'hooks'

import { setApiFeedback } from 'helpers'

export const useApiFeedback = () => {
   const { header, message, buttonText, callback } = useSelector(state => state.apiFeedback)

   const showApiFeedback = !!header && !!message && !!buttonText

   const resetApiFeedback = () => setApiFeedback('', '', '')

   return {
      header,
      message,
      buttonText,
      callback,
      showApiFeedback,
      resetApiFeedback,
   }
}

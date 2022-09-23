/* eslint-disable @typescript-eslint/no-empty-function */
import { store } from '@redux'

import { apiFeedbackActions } from '@redux/reducers/apiFeedback'

export const setApiFeedback = (
   header: string,
   message: string,
   buttonText = 'Okey',
   callback: () => void = () => {}
) => {
   store.dispatch(
      apiFeedbackActions.setApiFeedback({
         header,
         message,
         buttonText,
         callback,
      })
   )
}

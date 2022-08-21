/* eslint-disable @typescript-eslint/no-empty-function */
import { store } from 'redux/store'

import { setApiFeedback as setApiFeedbackAction } from 'redux/reducers/apiFeedback'

type SetApiFeedbackFn = (
   header: string,
   message: string,
   buttonText: string,
   callback?: () => void
) => void

export const setApiFeedback: SetApiFeedbackFn = (
   header,
   message,
   buttonText = 'Okey',
   callback = () => {}
) =>
   store.dispatch(
      setApiFeedbackAction({
         header,
         message,
         buttonText,
         callback,
      })
   )

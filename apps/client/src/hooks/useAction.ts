import type { AnyAction } from '@reduxjs/toolkit'

import { useDispatch } from 'hooks'

export const useAction = <T extends (...args: Parameters<T>) => AnyAction>(action: T) => {
   const dispatch = useDispatch()
   return (...args: Parameters<typeof action>) => dispatch(action(...args))
}

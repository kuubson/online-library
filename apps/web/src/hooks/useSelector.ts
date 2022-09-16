import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector as _useSelector } from 'react-redux'

import type { RootState } from 'redux/store'

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector

import { useDispatch as _useDispatch } from 'react-redux'

import type { AppDispatch } from '@redux'

export const useDispatch = () => _useDispatch<AppDispatch>()

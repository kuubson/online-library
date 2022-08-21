import { useDispatch as _useDispatch } from 'react-redux'

import { AppDispatch } from 'redux/store'

export const useDispatch = () => _useDispatch<AppDispatch>()

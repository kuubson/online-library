import { debounce } from 'lodash'

import { store } from '@redux'

import { loaderActions } from '@redux/reducers/loader'

export const setLoading = (loading: boolean) => store.dispatch(loaderActions.setLoading(loading))

export const debounceLoader = debounce(() => setLoading(true), 800)

export const resetLoader = () => {
   setLoading(false)
   debounceLoader.cancel()
}

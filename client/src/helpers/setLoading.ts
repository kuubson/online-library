import { store } from 'redux/store'

import { setLoading as setLoadingAction } from 'redux/reducers/loader'

export const setLoading = (loading: boolean) => {
   store.dispatch(setLoadingAction(loading))
}

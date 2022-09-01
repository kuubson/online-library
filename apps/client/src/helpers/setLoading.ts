import { store } from 'redux/store'

import { loaderActions } from 'redux/reducers/loader'

export const setLoading = (loading: boolean) => store.dispatch(loaderActions.setLoading(loading))

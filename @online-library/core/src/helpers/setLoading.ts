import { store } from '@redux'

import { loaderActions } from '@redux/reducers/loader'

export const setLoading = (loading: boolean) => store.dispatch(loaderActions.setLoading(loading))

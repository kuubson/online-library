import { store } from 'redux/store'

import { _setLoading } from 'redux/reducers/loader'

export const setLoading = (loading: boolean) => store.dispatch(_setLoading(loading))

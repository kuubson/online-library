import { store } from 'redux/store'

import actions from 'redux/actions'

type IsLoadingSetter = (loading: boolean) => void

export const setLoading: IsLoadingSetter = loading =>
    store.dispatch({
        type: actions.setLoading,
        payload: loading
    })

import { store } from 'redux/store'

export default (payload: boolean) =>
    store.dispatch({
        type: 'setIsLoading',
        payload
    })

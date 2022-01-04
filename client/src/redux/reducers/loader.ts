import actions from 'redux/actions'

const initialState = {
    loading: false
}

type Action = {
    payload: boolean
    type: 'setLoading'
}

const loader = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.setLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

export default loader

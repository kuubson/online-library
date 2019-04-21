import { SET_EMAIL, SET_FREEBOOKS, SET_PAIDBOOKS } from '../actions/actionTypes'

const initialState = {
    email: "",
    freebooks: [],
    paidbooks: []
}

export const user = (state = initialState, action) => {
    if (action.type === SET_EMAIL) {
        return Object.assign({}, state, {
            ...state,
            email: action.payload
        })
    }
    if (action.type === SET_FREEBOOKS) {
        return {
            ...state,
            freebooks: action.payload
        }
    }
    if (action.type === SET_PAIDBOOKS) {
        return {
            ...state,
            paidbooks: action.payload
        }
    }
    return state;
}
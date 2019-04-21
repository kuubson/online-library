import { SET_EMAIL, SET_FREEBOOKS, SET_PAIDBOOKS, SET_BOUGHTBOOKS, SET_CHECKEDOUTBOOKS } from '../actions/actionTypes'

const initialState = {
    email: "",
    freebooks: [],
    paidbooks: [],
    checkedOutBooks: [],
    boughtBooks: []
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
    if (action.type === SET_CHECKEDOUTBOOKS) {
        return {
            ...state,
            checkedOutBooks: action.payload
        }
    }
    if (action.type === SET_BOUGHTBOOKS) {
        return {
            ...state,
            boughtBooks: action.payload
        }
    }
    return state;
}
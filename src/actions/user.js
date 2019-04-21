import { SET_EMAIL, SET_FREEBOOKS, SET_PAIDBOOKS } from '../actions/actionTypes'

export const setEmail = (payload) => {
    return {
        type: SET_EMAIL,
        payload
    }
}

export const setFreeBooks = (payload) => {
    return {
        type: SET_FREEBOOKS,
        payload
    }
}

export const setPaidBooks = (payload) => {
    return {
        type: SET_PAIDBOOKS,
        payload
    }
}
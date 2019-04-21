import { SET_EMAIL, SET_FREEBOOKS, SET_PAIDBOOKS, SET_BOUGHTBOOKS, SET_CHECKEDOUTBOOKS } from '../actions/actionTypes'

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

export const setBoughtBooks = (payload) => {
    return {
        type: SET_BOUGHTBOOKS,
        payload
    }
}

export const setCheckedOutBooks = (payload) => {
    return {
        type: SET_CHECKEDOUTBOOKS,
        payload
    }
}
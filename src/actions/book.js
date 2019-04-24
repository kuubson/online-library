import { SET_TITLE, SET_AUTHOR, SET_PRICE, SET_COVER, SET_FREE_BOOKS, SET_PAID_BOOKS } from '../actions/actionTypes'

export const setTitle = (payload) => {
    return {
        type: SET_TITLE,
        payload
    }
}

export const setAuthor = (payload) => {
    return {
        type: SET_AUTHOR,
        payload
    }
}

export const setPrice = (payload) => {
    return {
        type: SET_PRICE,
        payload
    }
}

export const setCover = (payload) => {
    return {
        type: SET_COVER,
        payload
    }
}

export const setFreeBooks = (payload) => {
    return {
        type: SET_FREE_BOOKS,
        payload
    }
}


export const setPaidBooks = (payload) => {
    return {
        type: SET_PAID_BOOKS,
        payload
    }
}
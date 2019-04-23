import { SET_TITLE, SET_AUTHOR, SET_PRICE, SET_COVER } from '../actions/actionTypes'

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
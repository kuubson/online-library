import { SET_TITLE, SET_AUTHOR, SET_PRICE, SET_COVER, SET_FREE_BOOKS, SET_PAID_BOOKS, SET_BORROWED_BOOKS, SET_BOUGHT_BOOKS } from '../actions/actionTypes'

const initialState = {
    title: "",
    author: "",
    price: "",
    cover: "",
    freeBooks: "",
    paidBooks: "",
    borrowedBooks: "",
    boughtBooks: ""
}

export const book = (state = initialState, action) => {
    if (action.type === SET_TITLE) {
        return {
            ...state,
            title: action.payload
        }
    }
    if (action.type === SET_AUTHOR) {
        return {
            ...state,
            author: action.payload
        }
    }
    if (action.type === SET_PRICE) {
        return {
            ...state,
            price: action.payload
        }
    }
    if (action.type === SET_COVER) {
        return {
            ...state,
            cover: action.payload
        }
    }
    if (action.type === SET_FREE_BOOKS) {
        return {
            ...state,
            freeBooks: action.payload
        }
    }
    if (action.type === SET_PAID_BOOKS) {
        return {
            ...state,
            paidBooks: action.payload
        }
    }
    if (action.type === SET_BORROWED_BOOKS) {
        return {
            ...state,
            borrowedBooks: action.payload
        }
    }
    if (action.type === SET_BOUGHT_BOOKS) {
        return {
            ...state,
            boughtBooks: action.payload
        }
    }
    return state;
}